import { Response } from "miragejs";

/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function (){
    return new Response(201, {}, { videos: this.db.videos });
}

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */

// TODO: postVideoHandler


/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/user/videos/:videoId
 * */

export const getVideoHandler =  function (schema, request) {
    const videoId = request.params.productId;
    const video = this.db.videos.findBy({_id: videoId});
    return new Response(201, {}, { video });
}

