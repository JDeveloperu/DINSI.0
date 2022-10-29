//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@oppenzeppelin/contracts/access/Ownable.sol";
import "@oppenzeppelin/contracts/interfaces/IERC20.sol";
import "@oppenzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SolucionPagos is Ownable {

// --------
// Libs
// --------
using SafeERC20 for IERC20;

// ---------
//Structs
// ---------

struct WithdrawOrder {
    address to;
    uint256 date;
    uint256 amount;
    string reason;
    address approver;
    address investorapprover;

}

struct Movement {
    address to;
    uint256 date;
    uint256 amount;
    string reason;

}

struct Member {
    address member;
    uint256 date;
    uint256 amount;
    string reason;
    bool active;

}

// ----------
// Events
// ----------
event NewMember (address indexed wallet, bool isInvestor);
event NewOrder (address indexed wallet, uint256 amount);
event Approval (address indexed wallet, bool approved);
event Withdrawn (address indexed wallet, uint256 amount);

// ----------
// Fields
// ----------

address public token;

uint public withdrawn;

WithdrawOrder public order;

Movement[] public movements;

mapping(address => Member) public members;

// ----------
// Ctor
// ----------
constructor (address _token) Ownable() {
    token = _token;
    withdrawn = 0;
    resetOrder();
}

// ----------
//Public functions
// ----------
function getBalance() public view returns (uint256) {

}

function getMember(address addr) public view returns (Member memory) {

}

function addMember(string calldata name, address wallet, bool isInvestor) public onlyOwner {

}

function addOrder(uint256 amount, sring calldata reason) public {

}

function approveOrder (bool approve) public {

}

function withdrawInvestment() public {

}

function withdrawWringToken(address addr) external onlyOwner {

}

function withdrawBNB(address addr) external onlyOwner {

}

// ----------
// Private functions
// ----------
function reserOrder() private {

}
