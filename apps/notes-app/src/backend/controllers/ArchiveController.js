import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all archived notes in the db.
 * send GET Request at /api/archives
 * */

 export const getAllArchivedNotesHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      return new Response(200, {}, { archives: user.archives });
  };

  /**
 * This handler handles deletes note from archive.
 * send DELETE Request at /api/archives/delete/:noteId
 * */

  export const deleteFromArchivesHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const {noteId} = request.params;
      const filteredArchives = user.archives.filter(note => note._id !== noteId);
      user.archives = filteredArchives;
      return new Response(200, {}, { archives: user.archives });
  };


  /**
 * This handler handles restoring the archived notes to user notes.
 * send POST Request at /api/archives/restore/:noteId
 * */

   export const restoreFromArchivesHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const {noteId} = request.params;
      const restoredNote = user.archives.filter(note => note._id === noteId)[0];
      user.notes.push({...restoredNote})
      return new Response(200, {}, { archives: user.archives, notes: user.notes });
  };
