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
    public class paymentCashesController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/paymentCashes
        public IQueryable<paymentCash> GetpaymentCashes()
        {
            return db.paymentCashes;
        }

        // GET: api/paymentCashes/5
        [ResponseType(typeof(paymentCash))]
        public IHttpActionResult GetpaymentCash(int id)
        {
            paymentCash paymentCash = db.paymentCashes.Find(id);
            if (paymentCash == null)
            {
                return NotFound();
            }

            return Ok(paymentCash);
        }

        // PUT: api/paymentCashes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutpaymentCash(int id, paymentCash paymentCash)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentCash.payId)
            {
                return BadRequest();
            }

            db.Entry(paymentCash).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!paymentCashExists(id))
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

        // POST: api/paymentCashes
        [ResponseType(typeof(paymentCash))]
        public IHttpActionResult PostpaymentCash(paymentCash paymentCash)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.paymentCashes.Add(paymentCash);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (paymentCashExists(paymentCash.payId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = paymentCash.payId }, paymentCash);
        }

        // DELETE: api/paymentCashes/5
        [ResponseType(typeof(paymentCash))]
        public IHttpActionResult DeletepaymentCash(int id)
        {
            paymentCash paymentCash = db.paymentCashes.Find(id);
            if (paymentCash == null)
            {
                return NotFound();
            }

            db.paymentCashes.Remove(paymentCash);
            db.SaveChanges();

            return Ok(paymentCash);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool paymentCashExists(int id)
        {
            return db.paymentCashes.Count(e => e.payId == id) > 0;
        }
    }
}