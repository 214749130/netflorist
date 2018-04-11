using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using project_05.Models;

namespace project_05.Controllers
{
    public class adminProductsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/adminProducts
        public IQueryable<adminProduct> GetadminProducts()
        {
            return db.adminProducts;
        }

        // GET: api/adminProducts/5
        [ResponseType(typeof(adminProduct))]
        public IHttpActionResult GetadminProduct(int id)
        {
            adminProduct adminProduct = db.adminProducts.Find(id);
            if (adminProduct == null)
            {
                return NotFound();
            }

            return Ok(adminProduct);
        }

        // PUT: api/adminProducts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutadminProduct( adminProduct adminProduct)
        {
            int id = adminProduct.productid;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != adminProduct.productid)
            {
                return BadRequest();
            }

            db.Entry(adminProduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!adminProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/adminProducts
        [ResponseType(typeof(adminProduct))]
        public IHttpActionResult PostadminProduct(adminProduct adminProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.adminProducts.Add(adminProduct);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = adminProduct.productid }, adminProduct);
        }

        // DELETE: api/adminProducts/5
        [ResponseType(typeof(adminProduct))]
        public IHttpActionResult DeleteadminProduct(int id)
        {
            adminProduct adminProduct = db.adminProducts.Find(id);
            if (adminProduct == null)
            {
                return NotFound();
            }

            db.adminProducts.Remove(adminProduct);
            db.SaveChanges();

            return Ok(adminProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool adminProductExists(int id)
        {
            return db.adminProducts.Count(e => e.productid == id) > 0;
        }
    }
}