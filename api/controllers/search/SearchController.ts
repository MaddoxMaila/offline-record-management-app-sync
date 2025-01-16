import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiResponse from "../../libs/ApiResponse";
import ValidationError from "../../libs/ValidationError";
import DatabaseSingleton from "../../prisma/DatabaseSingleton";

const db = DatabaseSingleton.getDb()

const SearchController = {
    search: async (request: Request, response: Response) => {
        /**
         * @description
         * Implementation of search, searches both tracks and playlists on a multi-field level.
         * Uses SQL LIKE keyword to catch any occuranceof the search word in both tables
         */
        try{

            const {q} = request.query

            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new ValidationError("failed validations", {errors: errors.array()})

            const searchQuery = `%${q}%`

            const tracksSearch = await db.$queryRaw`SELECT * FROM track WHERE  album LIKE ${searchQuery} OR name LIKE ${searchQuery} OR artist LIKE ${searchQuery}`
            const playlistsSeach = await db.$queryRaw`SELECT * from playlist WHERE name LIKE ${searchQuery}`

            response.status(200).json(
                ApiResponse(false, "search results", {tracks: tracksSearch, playlist: playlistsSeach})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    }
}

export default SearchController