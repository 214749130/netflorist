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
    public class deliveryDetailsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/deliveryDetails
        public IQueryable<deliveryDetail> GetdeliveryDetails()
        {
            return db.deliveryDetails;
        }

        // GET: api/deliveryDetails/5
        [ResponseType(typeof(deliveryDetail))]
        public IHttpActionResult GetdeliveryDetail(int id)
        {
            deliveryDetail deliveryDetail = db.deliveryDetails.Find(id);
            if (deliveryDetail == null)
            {
                return NotFound();
            }

            return Ok(deliveryDetail);
        }

        // PUT: api/deliveryDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutdeliveryDetail(int id, deliveryDetail deliveryDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deliveryDetail.deliveryid)
            {
                return BadRequest();
            }

            db.Entry(deliveryDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!deliveryDetailExists(id))
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

        // POST: api/deliveryDetails
        [ResponseType(typeof(deliveryDetail))]
        public IHttpActionResult PostdeliveryDetail(deliveryDetail deliveryDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.deliveryDetails.Add(deliveryDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = deliveryDetail.deliveryid }, deliveryDetail);
        }

        // DELETE: api/deliveryDetails/5
        [ResponseType(typeof(deliveryDetail))]
        public IHttpActionResult DeletedeliveryDetail(int id)
        {
            deliveryDetail deliveryDetail = db.deliveryDetails.Find(id);
            if (deliveryDetail == null)
            {
                return NotFound();
            }

            db.deliveryDetails.Remove(deliveryDetail);
            db.SaveChanges();

            return Ok(deliveryDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool deliveryDetailExists(int id)
        {
            return db.deliveryDetails.Count(e => e.deliveryid == id) > 0;
        }
    }
}