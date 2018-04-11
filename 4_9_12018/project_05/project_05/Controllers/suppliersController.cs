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
    public class suppliersController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/suppliers
        public IQueryable<supplier> Getsuppliers()
        {
            return db.suppliers;
        }

        // GET: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Getsupplier(string supplieremail, string password)
        {
            supplier supplier = db.suppliers.Where(suppliers => suppliers.supplieremail.Equals(supplieremail)
            && suppliers.password.Equals(password)).FirstOrDefault();
            if (supplieremail == null && password == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/suppliers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsupplier( supplier supplier)
        {
            int id = supplier.Id;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.Id)
            {
                return BadRequest();
            }

            db.Entry(supplier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!supplierExists(id))
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

        // POST: api/suppliers
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Postsupplier(supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.suppliers.Add(supplier);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = supplier.Id }, supplier);
        }

        // DELETE: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Deletesupplier(int id)
        {
            supplier supplier = db.suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            db.suppliers.Remove(supplier);
            db.SaveChanges();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool supplierExists(int id)
        {
            return db.suppliers.Count(e => e.Id == id) > 0;
        }
    }
}