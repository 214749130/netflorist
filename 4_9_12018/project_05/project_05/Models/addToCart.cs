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
    
    public partial class addToCart
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public addToCart()
        {
            this.paymentCashes = new HashSet<paymentCash>();
            this.paymentCreditCards = new HashSet<paymentCreditCard>();
            this.paymentEFTs = new HashSet<paymentEFT>();
        }
    
        public int productid { get; set; }
        public string productname { get; set; }
        public double productprice { get; set; }
        public string productpicture { get; set; }
        public string productcategory { get; set; }
        public string productquantity { get; set; }
        public Nullable<int> prodId { get; set; }
    
        public virtual adminProduct adminProduct { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<paymentCash> paymentCashes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<paymentCreditCard> paymentCreditCards { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<paymentEFT> paymentEFTs { get; set; }
    }
}