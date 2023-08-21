SELECT "item"."item_id" AS "itemId",
    "item"."name",
    "item"."description",
    "item"."img_url" AS "imgUrl",
    COUNT("rating".*) AS "totalRatings",
    AVG("rating"."stars") AS "avgStars",
    "rating"."rating_id" AS "ratings.ratingId",
    "rating"."stars" AS "ratings.stars",
    "rating"."review" AS "ratings.review",
    "rating"."img_url" AS "ratings.imgUrl",
    "user"."user_id" AS "user.userId",
    "user"."username" AS "user.username"
FROM "items" AS "item"
    LEFT JOIN "ratings" AS "rating" ON "item"."item_id" = "rating"."item_id"
    JOIN "users" AS "user" ON "item"."user_id" = "user"."user_id"
GROUP BY "item"."item_id",
    "user"."user_id",
    "rating"."rating_id";
SELECT "item"."item_id" AS "itemId",
    "item"."name",
    "item"."description",
    "item"."img_url" AS "imgUrl",
    COUNT("ratings"."rating_id") AS "totalRatings",
    AVG("ratings"."stars") AS "avgStars",
    "user"."user_id" AS "user.userId",
    "user"."username" AS "user.username"
FROM "items" AS "item"
    LEFT OUTER JOIN "ratings" AS "ratings" ON "item"."item_id" = "ratings"."item_id"
    LEFT OUTER JOIN "users" AS "user" ON "item"."user_id" = "user"."user_id"
GROUP BY "item"."item_id",
    "user"."user_id";
SELECT "item"."item_id" AS "itemId",
    "item"."name",
    "item"."description",
    "item"."img_url" AS "imgUrl",
    COUNT("ratings"."rating_id") AS "totalRatings",
    AVG("ratings"."stars") AS "avgStars",
    "ratings"."rating_id" AS "ratings.ratingId",
    "ratings"."stars" AS "ratings.stars",
    "ratings"."review" AS "ratings.review",
    "ratings"."img_url" AS "ratings.imgUrl",
    "ratings"."user_id" AS "ratings.userId",
    "ratings"."item_id" AS "ratings.itemId"
FROM "items" AS "item"
    LEFT OUTER JOIN "ratings" AS "ratings" ON "item"."item_id" = "ratings"."item_id"
GROUP BY "item"."item_id",
    "ratings"."rating_id";