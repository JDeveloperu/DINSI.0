using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using Particle.Contracts.SolucionPagos.ContractDefinition;

namespace Particle.Contracts.SolucionPagos
{
    public partial class SolucionPagosService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, SolucionPagosDeployment solucionPagosDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<SolucionPagosDeployment>().SendRequestAndWaitForReceiptAsync(solucionPagosDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, SolucionPagosDeployment solucionPagosDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<SolucionPagosDeployment>().SendRequestAsync(solucionPagosDeployment);
        }

        public static async Task<SolucionPagosService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, SolucionPagosDeployment solucionPagosDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, solucionPagosDeployment, cancellationTokenSource);
            return new SolucionPagosService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public SolucionPagosService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<string> AddMemberRequestAsync(AddMemberFunction addMemberFunction)
        {
             return ContractHandler.SendRequestAsync(addMemberFunction);
        }

        public Task<TransactionReceipt> AddMemberRequestAndWaitForReceiptAsync(AddMemberFunction addMemberFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(addMemberFunction, cancellationToken);
        }

        public Task<string> AddMemberRequestAsync(string name, string wallet, bool isInvestor)
        {
            var addMemberFunction = new AddMemberFunction();
                addMemberFunction.Name = name;
                addMemberFunction.Wallet = wallet;
                addMemberFunction.IsInvestor = isInvestor;
            
             return ContractHandler.SendRequestAsync(addMemberFunction);
        }

        public Task<TransactionReceipt> AddMemberRequestAndWaitForReceiptAsync(string name, string wallet, bool isInvestor, CancellationTokenSource cancellationToken = null)
        {
            var addMemberFunction = new AddMemberFunction();
                addMemberFunction.Name = name;
                addMemberFunction.Wallet = wallet;
                addMemberFunction.IsInvestor = isInvestor;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(addMemberFunction, cancellationToken);
        }

        public Task<string> GetBNBRequestAsync(GetBNBFunction getBNBFunction)
        {
             return ContractHandler.SendRequestAsync(getBNBFunction);
        }

        public Task<TransactionReceipt> GetBNBRequestAndWaitForReceiptAsync(GetBNBFunction getBNBFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getBNBFunction, cancellationToken);
        }

        public Task<string> GetBNBRequestAsync(string addr)
        {
            var getBNBFunction = new GetBNBFunction();
                getBNBFunction.Addr = addr;
            
             return ContractHandler.SendRequestAsync(getBNBFunction);
        }

        public Task<TransactionReceipt> GetBNBRequestAndWaitForReceiptAsync(string addr, CancellationTokenSource cancellationToken = null)
        {
            var getBNBFunction = new GetBNBFunction();
                getBNBFunction.Addr = addr;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getBNBFunction, cancellationToken);
        }

        public Task<string> GetInvestmentRequestAsync(GetInvestmentFunction getInvestmentFunction)
        {
             return ContractHandler.SendRequestAsync(getInvestmentFunction);
        }

        public Task<TransactionReceipt> GetInvestmentRequestAndWaitForReceiptAsync(GetInvestmentFunction getInvestmentFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getInvestmentFunction, cancellationToken);
        }

        public Task<string> GetInvestmentRequestAsync(BigInteger amount, string reason)
        {
            var getInvestmentFunction = new GetInvestmentFunction();
                getInvestmentFunction.Amount = amount;
                getInvestmentFunction.Reason = reason;
            
             return ContractHandler.SendRequestAsync(getInvestmentFunction);
        }

        public Task<TransactionReceipt> GetInvestmentRequestAndWaitForReceiptAsync(BigInteger amount, string reason, CancellationTokenSource cancellationToken = null)
        {
            var getInvestmentFunction = new GetInvestmentFunction();
                getInvestmentFunction.Amount = amount;
                getInvestmentFunction.Reason = reason;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getInvestmentFunction, cancellationToken);
        }

        public Task<GetMemberOutputDTO> GetMemberQueryAsync(GetMemberFunction getMemberFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<GetMemberFunction, GetMemberOutputDTO>(getMemberFunction, blockParameter);
        }

        public Task<GetMemberOutputDTO> GetMemberQueryAsync(string addr, BlockParameter blockParameter = null)
        {
            var getMemberFunction = new GetMemberFunction();
                getMemberFunction.Addr = addr;
            
            return ContractHandler.QueryDeserializingToObjectAsync<GetMemberFunction, GetMemberOutputDTO>(getMemberFunction, blockParameter);
        }

        public Task<string> GetWrongTokenRequestAsync(GetWrongTokenFunction getWrongTokenFunction)
        {
             return ContractHandler.SendRequestAsync(getWrongTokenFunction);
        }

        public Task<TransactionReceipt> GetWrongTokenRequestAndWaitForReceiptAsync(GetWrongTokenFunction getWrongTokenFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getWrongTokenFunction, cancellationToken);
        }

        public Task<string> GetWrongTokenRequestAsync(string addr)
        {
            var getWrongTokenFunction = new GetWrongTokenFunction();
                getWrongTokenFunction.Addr = addr;
            
             return ContractHandler.SendRequestAsync(getWrongTokenFunction);
        }

        public Task<TransactionReceipt> GetWrongTokenRequestAndWaitForReceiptAsync(string addr, CancellationTokenSource cancellationToken = null)
        {
            var getWrongTokenFunction = new GetWrongTokenFunction();
                getWrongTokenFunction.Addr = addr;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(getWrongTokenFunction, cancellationToken);
        }

        public Task<MembersOutputDTO> MembersQueryAsync(MembersFunction membersFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<MembersFunction, MembersOutputDTO>(membersFunction, blockParameter);
        }

        public Task<MembersOutputDTO> MembersQueryAsync(string returnValue1, BlockParameter blockParameter = null)
        {
            var membersFunction = new MembersFunction();
                membersFunction.ReturnValue1 = returnValue1;
            
            return ContractHandler.QueryDeserializingToObjectAsync<MembersFunction, MembersOutputDTO>(membersFunction, blockParameter);
        }

        public Task<MovementsOutputDTO> MovementsQueryAsync(MovementsFunction movementsFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<MovementsFunction, MovementsOutputDTO>(movementsFunction, blockParameter);
        }

        public Task<MovementsOutputDTO> MovementsQueryAsync(BigInteger returnValue1, BlockParameter blockParameter = null)
        {
            var movementsFunction = new MovementsFunction();
                movementsFunction.ReturnValue1 = returnValue1;
            
            return ContractHandler.QueryDeserializingToObjectAsync<MovementsFunction, MovementsOutputDTO>(movementsFunction, blockParameter);
        }

        public Task<string> OwnerQueryAsync(OwnerFunction ownerFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(ownerFunction, blockParameter);
        }

        
        public Task<string> OwnerQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(null, blockParameter);
        }

        public Task<string> RenounceOwnershipRequestAsync(RenounceOwnershipFunction renounceOwnershipFunction)
        {
             return ContractHandler.SendRequestAsync(renounceOwnershipFunction);
        }

        public Task<string> RenounceOwnershipRequestAsync()
        {
             return ContractHandler.SendRequestAsync<RenounceOwnershipFunction>();
        }

        public Task<TransactionReceipt> RenounceOwnershipRequestAndWaitForReceiptAsync(RenounceOwnershipFunction renounceOwnershipFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(renounceOwnershipFunction, cancellationToken);
        }

        public Task<TransactionReceipt> RenounceOwnershipRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<RenounceOwnershipFunction>(null, cancellationToken);
        }

        public Task<string> TokenQueryAsync(TokenFunction tokenFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TokenFunction, string>(tokenFunction, blockParameter);
        }

        
        public Task<string> TokenQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TokenFunction, string>(null, blockParameter);
        }

        public Task<string> TransferOwnershipRequestAsync(TransferOwnershipFunction transferOwnershipFunction)
        {
             return ContractHandler.SendRequestAsync(transferOwnershipFunction);
        }

        public Task<TransactionReceipt> TransferOwnershipRequestAndWaitForReceiptAsync(TransferOwnershipFunction transferOwnershipFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferOwnershipFunction, cancellationToken);
        }

        public Task<string> TransferOwnershipRequestAsync(string newOwner)
        {
            var transferOwnershipFunction = new TransferOwnershipFunction();
                transferOwnershipFunction.NewOwner = newOwner;
            
             return ContractHandler.SendRequestAsync(transferOwnershipFunction);
        }

        public Task<TransactionReceipt> TransferOwnershipRequestAndWaitForReceiptAsync(string newOwner, CancellationTokenSource cancellationToken = null)
        {
            var transferOwnershipFunction = new TransferOwnershipFunction();
                transferOwnershipFunction.NewOwner = newOwner;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferOwnershipFunction, cancellationToken);
        }

        public Task<BigInteger> WithdrawnQueryAsync(WithdrawnFunction withdrawnFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<WithdrawnFunction, BigInteger>(withdrawnFunction, blockParameter);
        }

        
        public Task<BigInteger> WithdrawnQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<WithdrawnFunction, BigInteger>(null, blockParameter);
        }
    }
}
