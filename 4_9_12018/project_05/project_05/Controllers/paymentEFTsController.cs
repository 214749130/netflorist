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
    public class paymentEFTsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/paymentEFTs
        public IQueryable<paymentEFT> GetpaymentEFTs()
        {
            return db.paymentEFTs;
        }

        // GET: api/paymentEFTs/5
        [ResponseType(typeof(paymentEFT))]
        public IHttpActionResult GetpaymentEFT(int id)
        {
            paymentEFT paymentEFT = db.paymentEFTs.Find(id);
            if (paymentEFT == null)
            {
                return NotFound();
            }

            return Ok(paymentEFT);
        }

        // PUT: api/paymentEFTs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutpaymentEFT(int id, paymentEFT paymentEFT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentEFT.cardnumber)
            {
                return BadRequest();
            }

            db.Entry(paymentEFT).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!paymentEFTExists(id))
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

        // POST: api/paymentEFTs
        [ResponseType(typeof(paymentEFT))]
        public IHttpActionResult PostpaymentEFT(paymentEFT paymentEFT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.paymentEFTs.Add(paymentEFT);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = paymentEFT.cardnumber }, paymentEFT);
        }

        // DELETE: api/paymentEFTs/5
        [ResponseType(typeof(paymentEFT))]
        public IHttpActionResult DeletepaymentEFT(int id)
        {
            paymentEFT paymentEFT = db.paymentEFTs.Find(id);
            if (paymentEFT == null)
            {
                return NotFound();
            }

            db.paymentEFTs.Remove(paymentEFT);
            db.SaveChanges();

            return Ok(paymentEFT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool paymentEFTExists(int id)
        {
            return db.paymentEFTs.Count(e => e.cardnumber == id) > 0;
        }
    }
}