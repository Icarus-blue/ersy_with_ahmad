import expressAsyncHandler from "express-async-handler";
import client from "../utils/client.js";
import { getArtistById, getArtistByName, getArtistsSongs } from "../services/dataService.js";
import { Prisma } from "@prisma/client";

const generateWhere = (query, album_id) => {

    return { ...where }
}

export const getMusicVideos = expressAsyncHandler(async (req, res, next) => {

    const { page, pageSize, query, album_id, category } = req.query
    let videos = []
    if (query !== undefined || album_id !== undefined) {
        videos = await client.videos.findMany({
            take: parseInt(pageSize),
            skip: (page - 1) * pageSize,
            distinct: ['title', 'album_id', 'id_'],
            where: {
                OR: [
                    {
                        title: { contains: query }
                    },
                    { album_id: parseInt(album_id) },
                ]
            }
        });
    } else {
        console.log('hello');
        videos = await client.videos.findMany({
            take: parseInt(pageSize),
            skip: (page - 1) * pageSize,
            distinct: ['title', 'album_id', 'id_']
        });
    }

    if (category === 'trending') {
        videos = await client.videos.findMany({
            take: 200,
            // skip: (page - 1) * pageSize,
            distinct: ['title', 'album_id', 'id_'],
            where: {
                OR: [
                    {
                        title: { contains: query }
                    },
                    { album_id: parseInt(album_id) },
                ]
            }
        });
        videos = videos.filter((video) => parseInt(video.views) > 10000000)
    }
    res.status(200).json({
        status: true,
        videos
    })
})

export const getMusicVideosByGenre = expressAsyncHandler(async (req, res, next) => {
    const { genre, pageSize = 10, page = 1 } = req.body;
    let sqlQuery = `SELECT v.* FROM videos v
                    INNER JOIN artistes a ON v.artist_id = a.id_
                    WHERE 1=1`;

    // Genre filter
    if (genre) {
        // Use FIND_IN_SET to check if the genre is present in the comma-separated list
        sqlQuery += ` AND FIND_IN_SET('${genre}', a.genre) > 0`;
    }

    // Pagination (LIMIT and OFFSET)
    const offset = (page - 1) * pageSize;
    sqlQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
    console.log(sqlQuery);
    let baseQuery = Prisma.raw(sqlQuery);
    // Execute the modified query
    try {
        const videos = await client.$queryRaw(baseQuery);

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found with the specified genre.' });
        }

        res.json({ status: true, videos });
    } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export const getMusicVideosBySortingMode = expressAsyncHandler(async (req, res, next) => {

    const { filter, page = 1, pageSize = 10 } = req.query;

    if (!filter) {
        return res.status(400).json({ message: 'fiter mode is required' });
    }

    let videos = null;
    switch (filter) {
        case 'views':
            videos = await client.videos.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                orderBy: {
                    views: 'desc',
                },
            })
            break;
        case 'recent_first':
            videos = await client.videos.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                orderBy: {
                    release_date: 'desc',
                },
            })
            break;
        case 'oldest_first':
            videos = await client.videos.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                orderBy: {
                    release_date: 'asc',
                },
            })
            break
        case 'date_old':
            videos = await client.videos.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                orderBy: {
                    added_date: 'asc',
                },
            })
            break;
        case 'date_new':
            videos = await client.videos.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                orderBy: {
                    added_date: 'desc',
                },
            })
            break
    }

    if (!videos) return res.status(400).json({ message: 'Artists not found' });

    res.status(200).json({
        status: true,
        videos: videos.filter((video, index, arr) => arr.indexOf(video) === index)
    })
})

export const getMusicVideosByFilter = expressAsyncHandler(async (req, res, next) => {
    const { gender, ageFilter, groupType, pageSize = 10, page = 1 } = req.query;

    let sqlQuery = `SELECT v.* FROM videos v
                    INNER JOIN artistes a ON v.artist_id = a.id_
                    WHERE 1=1`;

    // Gender filter
    if (gender) {
        sqlQuery += ` AND a.gender = '${gender}'`; // Assuming gender is a field in the artistes table
    }

    // Group type filter
    if (groupType) {
        sqlQuery += ` AND a.group_type = '${groupType}'`; // Assuming group_type is a field in the artistes table
    }

    // Age filter (assuming dob is a field in the artistes table)
    if (ageFilter) {
        switch (ageFilter) {
            case '20>age':
                sqlQuery += " AND TIMESTAMPDIFF(YEAR, a.dob, CURDATE()) < 20";
                break;
            case '30-40':
                sqlQuery += " AND TIMESTAMPDIFF(YEAR, a.dob, CURDATE()) BETWEEN 30 AND 40";
                break;
            case '20-30':
                sqlQuery += " AND TIMESTAMPDIFF(YEAR, a.dob, CURDATE()) BETWEEN 20 AND 30";
                break;
            case '40<age':
                sqlQuery += " AND TIMESTAMPDIFF(YEAR, a.dob, CURDATE()) > 40";
                break;
        }
    }

    // Add pagination
    const offset = (page - 1) * pageSize;
    sqlQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
    let baseQuery = Prisma.raw(sqlQuery);

    // Execute the modified query
    try {
        const videos = await client.$queryRaw(baseQuery);
        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found with the specified filters.' });
        }
        res.status(200).json({ status: true, videos });
    } catch (error) {
        res.json({ status: true, videos });
        console.error('Error executing SQL query:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export const getMusicVideosBySearch = expressAsyncHandler(async (req, res, next) => {
    const { search, page = 1, pageSize = 10 } = req.body

    const videos = await client.videos.findMany({
        take: parseInt(pageSize),
        skip: (page - 1) * pageSize,
        where: {
            title: {
                contains: search.toLowerCase()
            },
        },
    });

    if (!videos) return next({ message: 'artist could not be found', status: 404 })

    res.status(200).json({
        status: true,
        videos,
    })
})

export const getArtistes = expressAsyncHandler(async (req, res, next) => {

    const { page, pageSize, query } = req.query;
    console.log(query);
    let where = {
        name_: {
            not: '0'
        }
    };

    if (query?.length > 50) {

        const jsonObj = JSON.parse(query);
        console.log(jsonObj);
        const genre = jsonObj.genre;
        const sortMode = jsonObj.sortMode;
        const filter = jsonObj.filter;
        let gender = filter.gender[0] || '';
        let ageBracket = filter.age[0] || '';
        let groupType = filter.groupType[0] || '';
        let labels = filter.labels[0] || '';
        const offset = (page - 1) * pageSize;
        let artistesUnsorted = null;
        let sql = '';
        if (genre == 'All') {
            artistesUnsorted = await client.$queryRaw`
            SELECT artistes.*, COUNT(gallery.id_) AS gallery_count
            FROM artistes
            LEFT JOIN gallery ON artistes.id_ = gallery.artist_id
            GROUP BY artistes.id_
        `;
        } else {
            artistesUnsorted = await client.$queryRaw`
            SELECT artistes.*, COUNT(gallery.id_) AS gallery_count
            FROM artistes
            LEFT JOIN gallery ON artistes.id_ = gallery.artist_id
            WHERE FIND_IN_SET(${genre}, artistes.genre) > 0
            GROUP BY artistes.id_
                `;
        }

        let artistesSorted = null;

        switch (sortMode) {
            case 'Views':
                artistesSorted = artistesUnsorted
                    .map(artiste => ({ ...artiste, views: parseInt(artiste.views) }))
                    .sort((a, b) => b.views - a.views);
                break;

            case 'RIP':
                artistesSorted = [];
                break;

            case 'Most Item First':
                artistesSorted = [];
                break;

            case 'A-Z':
                artistesSorted = artistesUnsorted.sort((a, b) => a.name_.localeCompare(b.name_));
                break;

            case 'Z-A':
                artistesSorted = artistesUnsorted.sort((a, b) => b.name_.localeCompare(a.name_));
                break;

            case 'Youngest to Oldest':
                artistesSorted = artistesUnsorted.sort((a, b) => new Date(b.dob) - new Date(a.dob));
                break;

            case 'Oldest to Youngest':
                artistesSorted = artistesUnsorted.sort((a, b) => new Date(a.dob) - new Date(b.dob));
                break;

            case 'Recently Updated':
                artistesSorted = [];
                break;

            case 'Birthday':

                const today = new Date();
                const todayMonth = today.getMonth() + 1; // JavaScript months are 0-based
                const todayDay = today.getDate();

                artistesSorted = artistesUnsorted.filter(artiste => {
                    const dob = new Date(artiste.dob);
                    const dobMonth = dob.getMonth() + 1; // JavaScript months are 0-based
                    const dobDay = dob.getDate();
                    return dobMonth === todayMonth && dobDay === todayDay;
                });

                break;

            case 'Monthly Listners':
                artistesSorted = artistesUnsorted.sort((a, b) => b.monthly_listeners - a.monthly_listeners);
                break;

            case 'Social Followers':
                artistesSorted = artistesUnsorted.sort((a, b) => {
                    const followersA = a.facebook_count + a.instagram_count + a.soundcloud_count + a.twitter_count + a.youtube_count + a.spotify_count;
                    const followersB = b.facebook_count + b.instagram_count + b.soundcloud_count + b.twitter_count + b.youtube_count + b.spotify_count;
                    return followersB - followersA; // Descending order
                });
                break;

            case 'Most Photos':
                artistesSorted = artistesUnsorted.sort((a, b) => {
                    const stringValue_a = a.gallery_count.toString();
                    const stringValue_b = b.gallery_count.toString();
                    let numericValue_a = Number(stringValue_a.slice(0, -1));
                    let numericValue_b = Number(stringValue_b.slice(0, -1));
                    return numericValue_b - numericValue_a
                });
                break;

            case 'Following':
                artistesSorted = [];
                break;
        }

        if (gender != '') {
            artistesSorted = artistesSorted.filter(artist => artist.gender === gender);
        }
        console.log(ageBracket);
        if (ageBracket != '') {

            artistesSorted = artistesSorted.filter(artist => {
                const birthdate = new Date(artist.dob);
                const today = new Date();
                let age = today.getFullYear() - birthdate.getFullYear();

                switch (ageBracket) {
                    case 'a':                       
                        return age < 20;
                    case 'b':                      
                        return age >= 20 && age <= 30;
                    case 'c':                       
                        return age > 30 && age <= 40;
                    case 'd':                      
                        return age > 40;
                    default:
                        return true; // Includes the artist if no specific bracket matches
                }
            });
        }

        if (groupType != '') {
            artistesSorted = artistesSorted.filter(artist => artist.group_type === groupType);
        }

        const paginatedArtistes = artistesSorted.slice((page - 1) * pageSize, page * pageSize);
        const serializedArtistes = paginatedArtistes.map(artist => ({
            ...artist,
            gallery_count: artist.gallery_count.toString(), // Convert BigInt to String
        }));

        res.status(200).json({
            status: true,
            artists: serializedArtistes
        })

    } else {
        if (query) {
            where.name_ = {
                contains: query
            };
        } else {
            where = {
                name_: {
                    not: '0'
                }
            };
        }
        const artistesUnsorted = await client.artistes.findMany({
            where: where,
        });
        const artistesSorted = artistesUnsorted
            .map(artiste => ({ ...artiste, views: parseInt(artiste.views) }))
            .sort((a, b) => b.views - a.views);
        const paginatedArtistes = artistesSorted.slice((page - 1) * pageSize, page * pageSize);
        res.status(200).json({
            status: true,
            artists: paginatedArtistes.filter((artist, index, arr) => arr.indexOf(artist) === index)
        })
    }
})

export const getAlbumsBySortingMode = expressAsyncHandler(async (req, res, next) => {

    const { filter, page = 1, pageSize = 10 } = req.body;

    if (!filter) {
        return res.status(400).json({ message: 'fiter mode is required' });
    }

    let where = {
        artist_id: {
            not: 0
        }
    };

    let albums = null;
    switch (filter) {
        case 'tracks':
            albums = await client.albums.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                orderBy: {
                    tracks_manuel: 'desc',
                },
                where
            })
            break;
        case 'duration':
            albums = await client.albums.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                orderBy: {
                    duration_manuel: 'desc',
                },
                where
            })
            break
        case 'recent_first':
            albums = await client.albums.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                orderBy: {
                    release_date: 'desc',
                },
                where
            })
            break;
        case 'oldest_first':
            albums = await client.albums.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                orderBy: {
                    release_date: 'asc',
                },
                where
            })
            break
        case 'most_popular_artist':
            albums = await client.albums.findMany({
                take: parseInt(pageSize),
                skip: (page - 1) * pageSize,
                distinct: ['id_'],
                where
            })
            break
    }

    if (!albums) return res.status(400).json({ message: 'Albums not found' });

    res.status(200).json({
        status: true,
        albums: albums.filter((artist, index, arr) => arr.indexOf(artist) === index)
    })
})

export const getArtist = expressAsyncHandler(async (req, res, next) => {
    const { artist_id } = req.params
    const artist = await getArtistById(artist_id);
    if (!artist) return next({ message: 'artist could not be found', status: 404 })

    // let artistSongs = await getArtistsSongs(artist.id_)

    res.status(200).json({
        status: true,
        artist,
        // songs: artistSongs
    })
})

export const getAlbumsBySearch = expressAsyncHandler(async (req, res, next) => {
    const { search } = req.body

    const albums = await client.albums.findMany({
        where: {

            name_: {
                contains: search.toLowerCase()
            },
        },
    });
    console.log(albums.length);
    if (!albums) return next({ message: 'artist could not be found', status: 404 })

    res.status(200).json({
        status: true,
        albums,
    })
})

export const getAlbums = expressAsyncHandler(async (req, res, next) => {
    const { page, pageSize, query } = req.query
    const albums = await client.albums.findMany({
        take: parseInt(pageSize),
        skip: (page - 1) * pageSize,
        distinct: ['name_'],
        where: {
            name_: {
                contains: query,
                not: 'Other'
            }
        }
    });

    res.status(200).json({
        status: true,
        albums: albums.filter((album, index, arr) => arr.indexOf(album) === index)
    })
})

export const getGallery = expressAsyncHandler(async (req, res, next) => {
    const { page, pageSize, query } = req.query

    const gallery = await client.gallery.findMany({
        take: parseInt(pageSize),
        skip: (page - 1) * pageSize,
    });

    // await Prisma.$queryRwa

    res.status(200).json({
        status: true,
        gallery
    })

})

export const getGalleryBySearch = expressAsyncHandler(async (req, res, next) => {
    const { artistName, pageSize = 10, page = 1 } = req.body;

    try {
        let query = `
            SELECT g.*
            FROM gallery g
            INNER JOIN artistes a ON g.artist_id = a.id_
            WHERE 1=1 AND FIND_IN_SET('${artistName}', a.name_) > 0`;

        const offset = (page - 1) * pageSize;
        query += ` LIMIT ${pageSize} OFFSET ${offset}`;
        let baseQuery = Prisma.raw(query);
        const galleries = await client.$queryRaw(baseQuery);

        if (galleries.length === 0) {
            return res.status(404).json({ message: `No galleries found for artist "${artistName}"` });
        }

        res.json({ status: true, galleries });
    } catch (error) {
        console.error('Error retrieving galleries:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
})

export const addEntry = expressAsyncHandler(async (req, res, next) => {
    const { entry } = req.body
    res.status(200).json({
        status: true,
        memsage: 'added correctly'
    })

})
