﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class project_05DBmdfEntities : DbContext
    {
        public project_05DBmdfEntities()
            : base("name=project_05DBmdfEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<addToCart> addToCarts { get; set; }
        public virtual DbSet<admin> admins { get; set; }
        public virtual DbSet<adminProduct> adminProducts { get; set; }
        public virtual DbSet<customer> customers { get; set; }
        public virtual DbSet<deliveryDetail> deliveryDetails { get; set; }
        public virtual DbSet<driver> drivers { get; set; }
        public virtual DbSet<paymentCash> paymentCashes { get; set; }
        public virtual DbSet<paymentCreditCard> paymentCreditCards { get; set; }
        public virtual DbSet<paymentEFT> paymentEFTs { get; set; }
        public virtual DbSet<supplier> suppliers { get; set; }
    }
}
