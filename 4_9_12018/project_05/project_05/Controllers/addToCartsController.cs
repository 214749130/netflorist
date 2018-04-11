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
    public class addToCartsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/addToCarts
        public IQueryable<addToCart> GetaddToCarts()
        {
            return db.addToCarts;
        }

        // GET: api/addToCarts/5
        [ResponseType(typeof(addToCart))]
        public IHttpActionResult GetaddToCart(int id)
        {
            addToCart addToCart = db.addToCarts.Find(id);
            if (addToCart == null)
            {
                return NotFound();
            }

            return Ok(addToCart);
        }

        // PUT: api/addToCarts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutaddToCart( addToCart addToCart)
        {
            int id = addToCart.productid;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != addToCart.productid)
            {
                return BadRequest();
            }

            db.Entry(addToCart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!addToCartExists(id))
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

        // POST: api/addToCarts
        [ResponseType(typeof(addToCart))]
        public IHttpActionResult PostaddToCart(addToCart addToCart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.addToCarts.Add(addToCart);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (addToCartExists(addToCart.productid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = addToCart.productid }, addToCart);
        }

        // DELETE: api/addToCarts/5
        [ResponseType(typeof(addToCart))]
        public IHttpActionResult DeleteaddToCart(int id)
        {
            addToCart addToCart = db.addToCarts.Find(id);
            if (addToCart == null)
            {
                return NotFound();
            }

            db.addToCarts.Remove(addToCart);
            db.SaveChanges();

            return Ok(addToCart);
        }


        // DELETE: api/addToCarts
        [ResponseType(typeof(addToCart))]
        public IHttpActionResult DeleteaddToCart()
        {
            addToCart addToCart = db.addToCarts.Find();
            if (addToCart == null)
            {
                return NotFound();
            }

            db.addToCarts.Remove(addToCart);
            db.SaveChanges();

            return Ok(addToCart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool addToCartExists(int id)
        {
            return db.addToCarts.Count(e => e.productid == id) > 0;
        }
    }
}