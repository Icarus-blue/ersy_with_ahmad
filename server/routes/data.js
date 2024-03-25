import { Router } from 'express'
import * as VideoController from '../controllers/data.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

/**
 * @swagger
 * /data/videos:
 *   get:
 *     summary: Retrieve a list of music videos
 *     tags: [Videos]
 *     description: This endpoint returns a list of music videos, supporting filtering by query, album ID, and category, as well as pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page for pagination (default is 10).
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Query string to search in video titles.
 *       - in: query
 *         name: album_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter videos by album ID.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Special category filter, e.g., 'trending' to filter videos by views.
 *     responses:
 *       200:
 *         description: A list of music videos based on the query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id_:
 *           type: integer
 *         title:
 *           type: string
 *         artist_id:
 *           type: integer
 *         artist_name:
 *           type: string
 *         video_id:
 *           type: string
 *         duration:
 *           type: integer
 *         views:
 *           type: string
 *         release_date:
 *           type: string
 *           format: date-time
 *         description_:
 *           type: string
 *         img:
 *           type: string
 *         category:
 *           type: string
 */

/**
 * @swagger
 * /data/artists:
 *   get:
 *     summary: Retrieve a list of artistes
 *     tags: [Artists]
 *     description: This endpoint returns a list of artistes, supporting search by artist name and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of items per page for pagination.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Query string to search artistes by name.
 *     responses:
 *       200:
 *         description: A list of artistes based on the query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 artists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_:
 *                         type: integer
 *                       name_:
 *                         type: string
 *                       nick_names:
 *                         type: string
 *                       url_:
 *                         type: string
 *                       verification_status:
 *                         type: boolean
 *                       dob:
 *                         type: string
 *                         format: date
 *                       dob_format:
 *                         type: string
 *                       birthplace:
 *                         type: string
 *                       img_:
 *                         type: string
 *                       alternate_name:
 *                         type: string
 *                       occupation:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       category:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       label:
 *                         type: string
 *                       label_id:
 *                         type: integer
 *                       group_type:
 *                         type: string
 *                       living_status:
 *                         type: string
 *                       youtube:
 *                         type: string
 *                       main_channel_id:
 *                         type: string
 *                       facebook:
 *                         type: string
 *                       instagram:
 *                         type: string
 *                       wikipedia:
 *                         type: string
 *                       genius_url:
 *                         type: string
 *                       twitter:
 *                         type: string
 *                       website:
 *                         type: string
 *                       soundcloud:
 *                         type: string
 *                       facebook_count:
 *                         type: integer
 *                       instagram_count:
 *                         type: integer
 *                       soundcloud_count:
 *                         type: integer
 *                       twitter_count:
 *                         type: integer
 *                       youtube_count:
 *                         type: integer
 *                       spotify_count:
 *                         type: integer
 *                       views:
 *                         type: string
 *                       monthly_listeners:
 *                         type: string
 */

/**
 * @swagger
 * /data/albums:
 *   get:
 *     summary: Retrieve a list of albums
 *     tags: [Albums]
 *     description: This endpoint returns a list of albums, supporting filtering by album name and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of albums per page for pagination.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Query string to search in album names.
 *     responses:
 *       200:
 *         description: A list of albums based on the query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 albums:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Album'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 * components:
 *   schemas:
 *     Album:
 *       type: object
 *       properties:
 *         id_:
 *           type: integer
 *         artist_id:
 *           type: integer
 *         artist_name:
 *           type: string
 *         artist_url:
 *           type: string
 *         name_:
 *           type: string
 *         label:
 *           type: string
 *         type_:
 *           type: string
 *         release_date:
 *           type: string
 *           format: date
 *         img_:
 *           type: string
 *         tracks_in:
 *           type: integer
 *         tracks_manuel:
 *           type: integer
 *         duration_manuel:
 *           type: integer
 *         apple_music:
 *           type: string
 *         spotify:
 *           type: string
 *         amazon:
 *           type: string
 *         youtube_music:
 *           type: string
 *         datpiff:
 *           type: string
 *         tidal:
 *           type: string
 */

/**
 * @swagger
 * /data/gallery:
 *   get:
 *     summary: Retrieve a paginated list of gallery items
 *     tags: [Gallery]
 *     description: This endpoint returns a paginated list of gallery items, optionally filtered by a query parameter.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of items per page for pagination.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: (Optional) Query string to filter the gallery items.
 *     responses:
 *       200:
 *         description: A paginated list of gallery items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 gallery:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GalleryItem'
 *       400:
 *         description: Bad request, such as invalid query parameters.
 *       500:
 *         description: Server error.
 * components:
 *   schemas:
 *     GalleryItem:
 *       type: object
 *       properties:
 *         id_:
 *           type: integer
 *         artist_id:
 *           type: integer
 *         source0:
 *           type: string
 *         source:
 *           type: string
 *         url_:
 *           type: string
 *         thumbnail_url:
 *           type: string
 *         width:
 *           type: integer
 *         height:
 *           type: integer
 *         date_:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         date_taken:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /data/artists/genre:
 *   post:
 *     summary: Retrieve artists by genre
 *     tags: [Artists]
 *     description: This endpoint returns a paginated list of artists filtered by the specified genre. The example uses 'hip hop' as a genre filter, but any genre can be specified.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *                 description: Genre to filter artists by.
 *                 example: hip hop
 *               page:
 *                 type: integer
 *                 description: Page number for pagination.
 *                 example: 1
 *               pageSize:
 *                 type: integer
 *                 description: Number of items per page for pagination.
 *                 example: 10
 *     responses:
 *       200:
 *         description: A list of artists filtered by genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 artistes:
 *                   type: array
 *                   items:
 *       400:
 *         description: Bad request, such as missing genre in the request body.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /data/artists/{artist_id}:
 *   get:
 *     summary: Retrieve details about a specific artist by ID
 *     tags: [Artists]
 *     description: This endpoint returns detailed information about an artist, identified by their unique ID. The response includes the artist's profile and could be extended to include associated songs.
 *     parameters:
 *       - in: path
 *         name: artist_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the artist.
 *     responses:
 *       200:
 *         description: Detailed information about the artist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 artist:
 *                   type: object
 *                   properties:
 *                     id_:
 *                       type: integer
 *                       description: The artist's unique identifier.
 *                       example: 1
 *                     name_:
 *                       type: string
 *                       description: The name of the artist.
 *                       example: "John Doe"
 *                     nick_names:
 *                       type: string
 *                       description: The artist's nicknames.
 *                       example: "JD"
 *                     url_:
 *                       type: string
 *                       description: The URL to the artist's profile.
 *                       example: "https://example.com/artists/johndoe"
 *                     verification_status:
 *                       type: boolean
 *                       description: Indicates if the artist is verified.
 *                       example: false
 *                     dob:
 *                       type: string
 *                       format: date
 *                       description: The artist's date of birth.
 *                       example: "1990-01-01"
 *                     genre:
 *                       type: string
 *                       description: The artist's music genre.
 *                       example: "Pop"
 *                     occupation:
 *                       type: string
 *                       description: The artist's occupation.
 *                       example: "Musician"
 *                     label:
 *                       type: string
 *                       description: The record label the artist is associated with.
 *                       example: "Example Label"
 *                     img_:
 *                       type: string
 *                       description: URL to the artist's image.
 *                       example: "https://example.com/images/johndoe.jpg"                  
 *       404:
 *         description: Artist could not be found.
 *       500:
 *         description : Internal server error
 */


/**
 * @swagger
 * /data/artists/sortmode:
 *   post:
 *     summary: Sort artists based on a specified sorting mode 'views','z-a','a-z','birthday','o-to-y','y-to-o'
 *     tags: [Artists]
 *     description: >
 *       Allows clients to retrieve a list of artists sorted based on various modes such as views, alphabetical order, 
 *       monthly listeners, and more. The sorting mode is specified in the request body along with pagination options.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: string
 *                 description: The sorting mode for artists. Valid values are 'views', 'rip', 'a-z', 'z-a', 'y-to-o', 'o-to-y', 'recently-updated', 'birthday', 'monthly-listeners', 'social_followers', 'most_photos', 'following'.
 *                 example: views
 *               page:
 *                 type: integer
 *                 description: Page number for pagination, defaults to 1.
 *                 example: 1
 *               pageSize:
 *                 type: integer
 *                 description: Number of items per page for pagination, defaults to 10.
 *                 example: 10
 *     responses:
 *       200:
 *         description: A list of sorted artists based on the filter mode.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 artists:
 *                   type: array
 *                   items:
 *                 
 *       400:
 *         description: Bad request, such as missing filter mode or invalid filter mode specified.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * paths:
 *   /data/artists/filter:
 *     post:
 *       summary: Filter artists based on specified criteria
 *       tags:
 *         - Artists
 *       description: Filters artists based on gender, age range, and group type. Allows for complex querying to find artists that match the given criteria.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gender:
 *                   type: string
 *                   description: The gender to filter by.
 *                   example: 'Male'
 *                 ageFilter:
 *                   type: string
 *                   description: An age range or specific age query. Valid options are '20>age', '30-40', '20-30', '40<age'.
 *                   example: '20-30'
 *                 groupType:
 *                   type: string
 *                   description: The type of artist grouping to filter by. Valid options are 'solo' and 'group'.
 *                   example: 'solo'
 *       responses:
 *         200:
 *           description: A list of artists that match the specified filters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   artists:
 *                     type: array
 *                     items:
 *                     
 *         400:
 *           description: Bad request, such as missing or invalid filters.
 *         404:
 *           description: No artists found matching the specified filters.
 */

/**
 * @swagger
 * paths:
 *   /data/artists/search:
 *     post:
 *       summary: Search for artists by name
 *       tags:
 *         - Artists
 *       description: Searches for artists whose names contain the provided search term, using a case-insensitive search.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - search
 *               properties:
 *                 search:
 *                   type: string
 *                   description: The search term used to query artist names.
 *                   example: 'John'
 *       responses:
 *         200:
 *           description: Successfully found matching artists.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   artists:
 *                     type: array
 *                     items:
 *                    
 *         404:
 *           description: No artists found matching the search criteria.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 'artist could not be found'
 */

/**
 * @swagger
 * paths:
 *   /data/albums/search:
 *     post:
 *       summary: Search for artists by name
 *       tags:
 *         - Albums
 *       description: Searches for artists whose names contain the provided search term, using a case-insensitive search.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - search
 *               properties:
 *                 search:
 *                   type: string
 *                   description: The search term used to query artist names.
 *                   example: 'John'
 *       responses:
 *         200:
 *           description: Successfully found matching artists.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   albums:
 *                     type: array
 *                     items:
 *                    
 *         404:
 *           description: No artists found matching the search criteria.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 'artist could not be found'
 */

/**
 * @swagger
 * paths:
 *   /data/albums/sortmode:
 *     post:
 *       summary: Sort albums based on specified criteria
 *       tags:
 *         - Albums
 *       description: |
 *         Allows sorting albums based on different criteria such as tracks count,
 *         album duration, release date, and popularity of the artist.
 *         filter  : "tracks" ,"duration","recent_first","oldest_first","most_popular_artist"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - filter
 *               properties:
 *                 filter:
 *                   type: string
 *                   description: |
 *                     The criteria for sorting the albums.
 *                     Valid options are 'tracks', 'duration', 'recent_first', 'oldest_first', 'most_popular_artist'.
 *                   enum:
 *                     - tracks
 *                     - duration
 *                     - recent_first
 *                     - oldest_first
 *                     - most_popular_artist
 *                 page:
 *                   type: integer
 *                   description: Page number for pagination, starting from 1.
 *                   example: 1
 *                   default: 1
 *                 pageSize:
 *                   type: integer
 *                   description: The number of items per page for pagination.
 *                   example: 10
 *                   default: 10
 *       responses:
 *         200:
 *           description: Successfully retrieved sorted albums.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   albums:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Album'
 *         400:
 *           description: Bad request, such as missing or invalid filter mode.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Filter mode is required'
 *         404:
 *           description: No albums found matching the sorting criteria.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 'Albums not found'
 */

/**
 * @swagger
 * paths:
 *   /data/albums/addentry:
 *     get:
 *       summary: Add an album entry
 *       tags:
 *         - Albums
 *       parameters:
 *         - in: query
 *           name: entry
 *           required: true
 *           schema:
 *             type: string
 *           description: The entry to be added.
 *       responses:
 *         200:
 *           description: Entry added successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: 'added correctly'
 *         400:
 *           description: Bad request, such as missing entry.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 'Entry is required'
 */

/**
 * @swagger
 * paths:
 *   /data/videos/genre:
 *     get:
 *       summary: Retrieve music videos by genre
 *       tags:
 *         - Videos
 *       description: Fetches music videos filtered by a specific genre, with support for pagination.
 *       parameters:
 *         - in: query
 *           name: genre
 *           required: true
 *           schema:
 *             type: string
 *           description: The genre to filter music videos by.
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             default: 1
 *           description: The page number for pagination.
 *         - in: query
 *           name: pageSize
 *           schema:
 *             type: integer
 *             default: 10
 *           description: The number of items per page for pagination.
 *       responses:
 *         200:
 *           description: Successfully retrieved music videos by the specified genre.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   artists:
 *                     type: array
 *                     items:
 *                     
 *         400:
 *           description: Missing or invalid parameters, such as absent genre.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 'Genre is required'
 */

/**
 * @swagger
 * paths:
 *   /data/videos/sortmode:
 *     get:
 *       summary: Sort music videos based on a specified mode
 *       tags:
 *         - Videos
 *       description: Sorts music videos based on various criteria such as recency, popularity, etc., with support for pagination.
 *       parameters:
 *         - in: query
 *           name: filter
 *           required: true
 *           schema:
 *             type: string
 *           description: The sorting mode for the videos. Valid options include 'recent_first', 'oldest_first', 'date_old', 'date_new'.
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             default: 1
 *           description: Page number for pagination.
 *         - in: query
 *           name: pageSize
 *           schema:
 *             type: integer
 *             default: 10
 *           description: Number of videos per page for pagination.
 *       responses:
 *         200:
 *           description: Successfully sorted and retrieved music videos.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   videos:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Video'
 *         400:
 *           description: Bad request, such as missing or invalid sorting mode.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Filter mode is required'
 */

/**
 * @swagger
 * paths:
 *   /data/videos/filter:
 *     get:
 *       summary: Fetch music videos based on filters
 *       tags:
 *         - Videos
 *       description: Retrieves music videos by applying filters on the associated artist's gender, age, and group type.
 *       parameters:
 *         - in: query
 *           name: gender
 *           schema:
 *             type: string
 *           description: Filter videos by the gender of the artist.
 *         - in: query
 *           name: ageFilter
 *           schema:
 *             type: string
 *           description: Filter videos by the age range of the artist. Valid values are '20>age', '30-40', '20-30', '40<age'.
 *         - in: query
 *           name: groupType
 *           schema:
 *             type: string
 *           description: Filter videos by the group type of the artist. Examples include 'solo', 'band', etc.
 *         - in: query
 *           name: pageSize
 *           schema:
 *             type: integer
 *             default: 10
 *           description: Number of videos to return per page.
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             default: 1
 *           description: Page number for pagination.
 *       responses:
 *         200:
 *           description: An array of music videos that match the specified filters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   videos:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Video'
 *         404:
 *           description: No videos found matching the specified filters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'No videos found with the specified filters.'
 *         500:
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Internal server error.'
*/

/**
 * @swagger
 * paths:
 *   /data/videos/search:
 *     post:
 *       summary: Search for music videos by title
 *       tags:
 *         - Videos
 *       description: Performs a search for music videos that contain the specified search term in their title.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - search
 *               properties:
 *                 search:
 *                   type: string
 *                   description: The search term to query within video titles.
 *                   example: "Love"
 *                 page:
 *                   type: number
 *                   description: page .
 *                   example: "1"
 *                 pagesize:
 *                   type: number
 *                   description: page size.
 *                   example: "10"
 *       responses:
 *         200:
 *           description: Successfully found matching videos.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   videos:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Video'
 *         404:
 *           description: No videos found matching the search criteria.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'No videos found with the specified search term.'
 */

/**
 * @swagger
 * paths:
 *   /data/gallery/search:
 *     post:
 *       summary: Search galleries by artist name
 *       tags:
 *         - Gallery
 *       description: Fetches gallery items based on a search term for the artist's name.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - artistName
 *               properties:
 *                 artistName:
 *                   type: string
 *                   description: The artist's name to search for in the gallery.
 *                   example: "Picasso"
 *                 pageSize:
 *                   type: integer
 *                   description: The number of gallery items to return per page.
 *                   default: 10
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   description: The page number for pagination.
 *                   default: 1
 *                   example: 1
 *       responses:
 *         200:
 *           description: Successfully found matching galleries.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   galleries:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/GalleryItem'
 *         404:
 *           description: No galleries found matching the artist name.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'No galleries found for artists containing "Picasso"'
 *         500:
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Internal server error.'
 *        
 */

router.get('/videos', VideoController.getMusicVideos)
router.get('/videos/genre', VideoController.getMusicVideosByGenre)
router.get('/videos/sortmode', VideoController.getMusicVideosBySortingMode)
router.get('/videos/filter', VideoController.getMusicVideosByFilter)
router.post('/videos/search', VideoController.getMusicVideosBySearch)

// router.get('/interviews', VideoController.getInterviews)

router.get('/artists', VideoController.getArtistes)
router.post('/artists/genre', VideoController.getArtistesByGenre)
router.post('/artists/sortmode', VideoController.getArtistesBySortingMode)
router.post('/artists/filter', VideoController.getArtistesByfilter)
router.post('/artists/search', VideoController.getArtistesBySearch)
router.get("/artists/:artist_id", VideoController.getArtist)

router.post('/albums/search', VideoController.getAlbumsBySearch)
router.post('/albums/sortmode', VideoController.getAlbumsBySortingMode)
router.get('/albums', VideoController.getAlbums)
router.get('/albums/addentry', VideoController.addEntry)

router.get('/gallery', VideoController.getGallery)
router.post('/gallery/search', VideoController.getGalleryBySearch)

export default router