'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with editors
 */

 const Note = use('App/Models/Note') 

class EditorController {
  /**
   * Show a list of all editors.
   * GET editors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const collectionIdAndTitle = await Note.query().select("title","_id").fetch()
    response.json(collectionIdAndTitle)


  }

  /**
   * Render a form to be used for creating a new editor.
   * GET editors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new editor.
   * POST editors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const prams = await request.only('title') ;
    const note = new Note() ;
    note.title =  prams.title
    note.blocks = []
    await note.save()

    response.json(note)
    

  }

  /**
   * Display a single editor.
   * GET editors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const {id} = params
    const note = await Note.findOrFail(id)
    response.json(note)
  }

  /**
   * Render a form to update an existing editor.
   * GET editors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    
  }


  /**
   * Update editor details.
   * PUT or PATCH editors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const {id} = params
    const req = request.only(["_id","title","blocks"])
    const note = await Note.findOrFail(id)
    note.merge({

      blocks:req.blocks
    })
    await note.save()

    response.json(note)
  }

  /**
   * Delete a editor with id.
   * DELETE editors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EditorController
