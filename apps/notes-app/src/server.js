import { Server, Model, RestSerializer } from 'miragejs'
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler
} from './backend/controllers/ArchiveController'
import {
  loginHandler,
  signupHandler
} from './backend/controllers/AuthController'
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler
} from './backend/controllers/NotesController'

export function makeServer ({ environment = 'development' } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model
    },

    // Runs on the start of the server
    seeds (server) {
      // users.forEach((item) =>
      //   server.create("user", { ...item, cart: [], wishList: [] })
      // );
    },

    routes () {
      this.namespace = 'api'
      // auth routes (public)
      this.post('/auth/signup', signupHandler.bind(this))
      this.post('/auth/login', loginHandler.bind(this))

      // notes routes (private)
      this.get('/notes', getAllNotesHandler.bind(this))
      this.post('/notes', createNoteHandler.bind(this))
      this.post('/notes/:noteId', updateNoteHandler.bind(this))
      this.delete('/notes/:noteId', deleteNoteHandler.bind(this))

      // archive routes (private)
      this.get('/archives', getAllArchivedNotesHandler.bind(this))
      this.post(
        '/archives/restore/:noteId',
        restoreFromArchivesHandler.bind(this)
      )
      this.delete(
        '/archives/delete/:noteId',
        deleteFromArchivesHandler.bind(this)
      )
      this.post('/notes/archive/:noteId', archiveNoteHandler.bind(this))
    }
  })
  return server
}
