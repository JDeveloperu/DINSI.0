using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Particle.Contracts.SolucionPagos.ContractDefinition
{
    public partial class Member : MemberBase { }

    public class MemberBase 
    {
        [Parameter("string", "name", 1)]
        public virtual string Name { get; set; }
        [Parameter("address", "wallet", 2)]
        public virtual string Wallet { get; set; }
        [Parameter("bool", "enabled", 3)]
        public virtual bool Enabled { get; set; }
        [Parameter("bool", "isInvestor", 4)]
        public virtual bool IsInvestor { get; set; }
        [Parameter("uint256", "lastMovement", 5)]
        public virtual BigInteger LastMovement { get; set; }
    }
}
