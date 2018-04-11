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
    public class driversController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/drivers
        public IQueryable<driver> Getdrivers()
        {
            return db.drivers;
        }

        // GET: api/drivers/5
        [ResponseType(typeof(driver))]
        public IHttpActionResult Getdriver(string driveremail, string password)
        {
            driver driver = db.drivers.Where(drivers => drivers.driveremail.Equals(driveremail)
            && drivers.password.Equals(password)).FirstOrDefault();
            if (driveremail == null && password == null)
            {
                return NotFound();
            }

            return Ok(driver);

        }

        // PUT: api/drivers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdriver( driver driver)
        {
            int id = driver.driverId;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != driver.driverId)
            {
                return BadRequest();
            }

            db.Entry(driver).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!driverExists(id))
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

        // POST: api/drivers
        [ResponseType(typeof(driver))]
        public IHttpActionResult Postdriver(driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.drivers.Add(driver);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = driver.driverId }, driver);
        }

        // DELETE: api/drivers/5
        [ResponseType(typeof(driver))]
        public IHttpActionResult Deletedriver(int id)
        {
            driver driver = db.drivers.Find(id);
            if (driver == null)
            {
                return NotFound();
            }

            db.drivers.Remove(driver);
            db.SaveChanges();

            return Ok(driver);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool driverExists(int id)
        {
            return db.drivers.Count(e => e.driverId == id) > 0;
        }
    }
}