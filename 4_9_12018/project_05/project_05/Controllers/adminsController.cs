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
    public class adminsController : ApiController
    {
        private project_05DBmdfEntities db = new project_05DBmdfEntities();

        // GET: api/admins
        public IQueryable<admin> Getadmins()
        {
            return db.admins;
        }

        // GET: api/admins/5
        [ResponseType(typeof(admin))]
        public IHttpActionResult Getadmin(string adminemail, string password)
        {
            admin admin = db.admins.Where(admins => admins.adminemail.Equals(adminemail)
            && admins.password.Equals(password)).FirstOrDefault();
            if (adminemail == null && password == null)
            {
                return NotFound();
            }

            return Ok(admin);          
        }

        // PUT: api/admins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putadmin(admin admin)
        {
            int id = admin.Id;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != admin.Id)
            {
                return BadRequest();
            }

            db.Entry(admin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!adminExists(id))
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

        // POST: api/admins
        [ResponseType(typeof(admin))]
        public IHttpActionResult Postadmin(admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.admins.Add(admin);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = admin.Id }, admin);
        }

        // DELETE: api/admins/5
        [ResponseType(typeof(admin))]
        public IHttpActionResult Deleteadmin(int id)
        {
            admin admin = db.admins.Find(id);
            if (admin == null)
            {
                return NotFound();
            }

            db.admins.Remove(admin);
            db.SaveChanges();

            return Ok(admin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool adminExists(int id)
        {
            return db.admins.Count(e => e.Id == id) > 0;
        }
    }
}