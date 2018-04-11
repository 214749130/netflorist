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
    public class paymentCreditCardsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/paymentCreditCards
        public IQueryable<paymentCreditCard> GetpaymentCreditCards()
        {
            return db.paymentCreditCards;
        }

        // GET: api/paymentCreditCards/5
        [ResponseType(typeof(paymentCreditCard))]
        public IHttpActionResult GetpaymentCreditCard(int id)
        {
            paymentCreditCard paymentCreditCard = db.paymentCreditCards.Find(id);
            if (paymentCreditCard == null)
            {
                return NotFound();
            }

            return Ok(paymentCreditCard);
        }

        // PUT: api/paymentCreditCards/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutpaymentCreditCard(int id, paymentCreditCard paymentCreditCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentCreditCard.cardnumber)
            {
                return BadRequest();
            }

            db.Entry(paymentCreditCard).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!paymentCreditCardExists(id))
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

        // POST: api/paymentCreditCards
        [ResponseType(typeof(paymentCreditCard))]
        public IHttpActionResult PostpaymentCreditCard(paymentCreditCard paymentCreditCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.paymentCreditCards.Add(paymentCreditCard);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (paymentCreditCardExists(paymentCreditCard.cardnumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = paymentCreditCard.cardnumber }, paymentCreditCard);
        }

        // DELETE: api/paymentCreditCards/5
        [ResponseType(typeof(paymentCreditCard))]
        public IHttpActionResult DeletepaymentCreditCard(int id)
        {
            paymentCreditCard paymentCreditCard = db.paymentCreditCards.Find(id);
            if (paymentCreditCard == null)
            {
                return NotFound();
            }

            db.paymentCreditCards.Remove(paymentCreditCard);
            db.SaveChanges();

            return Ok(paymentCreditCard);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool paymentCreditCardExists(int id)
        {
            return db.paymentCreditCards.Count(e => e.cardnumber == id) > 0;
        }
    }
}