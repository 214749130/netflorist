//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace project_05.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class paymentEFT
    {
        public int cardnumber { get; set; }
        public string bankname { get; set; }
        public string transitroutingno { get; set; }
        public string bankaccountno { get; set; }
        public Nullable<int> productid { get; set; }
    
        public virtual addToCart addToCart { get; set; }
    }
}
