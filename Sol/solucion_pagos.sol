// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SolucionPagos is Ownable {
  //  =====================
  //  Libs
  //  =====================
  using SafeERC20 for IERC20;

  //  =====================
  //  Structs
  //  =====================
  struct WithdrawOrder {
    address to;
    uint256 date;
    uint256 amount;
    string reason;
    address approver;
    address investorApprover;
    //  0 - En espera, 1 - Aprobado, 2 - Rechazado
    uint8 approved;
    uint8 approvedByInvestor;
    bool finished;
  }

  struct Movement {
    address to;
    uint256 date;
    uint256 amount;
    string reason;
  }

  struct Member {
    string name;
    address wallet;
    bool enabled;
    bool isInvestor;
    uint256 lastMovement;
  }

  //  =====================
  //  Events
  //  =====================
  event NewMember(address indexed wallet, bool isInvestor);
  event NewOrder(address indexed wallet, uint256 amount);
  event Approval(address indexed wallet, bool approved);
  event Withdrawn(address indexed wallet, uint256 amount);

  //  =====================
  //  Fields
  //  =====================
  address public token;

  uint256 public withdrawn;

  WithdrawOrder public order;

  Movement[] public movements;

  mapping(address => Member) public members;

  //  =====================
  //  Ctor
  //  =====================
  constructor(address _token) Ownable() {
    token = _token;
    withdrawn = 0;
    resetOrder();
  }

  //  =====================
  //  Public functions
  //  =====================
  function getBalance() public view returns (uint256) {
    return IERC20(token).balanceOf(address(this));
  }

  function getMemberStatus(address addr) external view returns (uint8) {
    if(members[addr].wallet != addr) {
      return 0;
    }

    if(members[addr].isInvestor) {
      return 2;
    }

    return 1;
  }

  function getMember(address addr) public view returns (Member memory) {
    return members[addr];
  }

  function addMember(string calldata name, address wallet, bool isInvestor) public onlyOwner {
    members[wallet] = Member(name, wallet, true, isInvestor, 0);

    emit NewMember(wallet, isInvestor);
  }

  function addOrder(uint256 amount, string calldata reason) public {
    require(members[_msgSender()].enabled && !members[_msgSender()].isInvestor, "Unauthorized");
    require(order.finished, "Order not finished");

    uint256 balance = IERC20(token).balanceOf(address(this));
    require(balance >= amount, "Insufficient balance");

    order = WithdrawOrder(_msgSender(), block.timestamp, amount, reason, address(0), address(0), 0, 0, false);
  }

  function approveOrder(bool approve, bool autoWithdraw) public {
    require(!order.finished, "Order finished");
    require(members[_msgSender()].enabled, "Unauthorized");

    if (members[_msgSender()].isInvestor) {
      require(order.approvedByInvestor == 0, "Invalid status");

      order.approvedByInvestor = approve ? 1 : 2;
    }
    else {
      require(order.approved == 0, "Invalid status");
      require(order.to != _msgSender(), "Unauthorized");

      order.approved = approve ? 1 : 2;
    }

    if (autoWithdraw && order.approved == 1 && order.approvedByInvestor == 1) {
      withdrawInvestmentTo(order.to);
    }

    if (order.approved == 2 || order.approvedByInvestor == 2) {
      order.finished = true;
    }
  }

  function withdrawInvestment() external {
    withdrawInvestmentTo(_msgSender());
  }

  function withdrawInvestmentTo(address toAddress) private {
    require(order.to == toAddress, "Unauthorized");
    require(!order.finished, "Order finished");
    require(order.approved == 1, "Order not approved");
    require(order.approvedByInvestor == 1, "Order not approved by investor");

    uint256 balance = IERC20(token).balanceOf(address(this));
    require(balance >= order.amount, "Insufficient balance");

    movements.push(Movement(toAddress, block.timestamp, order.amount, order.reason));

    IERC20(token).safeTransfer(toAddress, order.amount);

    withdrawn += order.amount;

    emit Withdrawn(toAddress, order.amount);

    resetOrder();
  }

  function withdrawWrongToken(address addr) external onlyOwner {
    require(addr != token, "Owner cannot withdraw investments");
    IERC20(addr).safeTransfer(owner(), IERC20(addr).balanceOf(address(this)));
  }

  function withdrawBNB(address addr) external onlyOwner {
    require(addr != token, "Owner cannot withdraw investments");
    uint256 balance = address(this).balance;
    payable(owner()).transfer(balance);
  }

  //  =====================
  //  Private functions
  //  =====================
  function resetOrder() private {
    order = WithdrawOrder(address(0), 0, 0, "", address(0), address(0), 0, 0, true);
  }
}
