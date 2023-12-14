CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        fullname VARCHAR(50) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        gender VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255)
    );

CREATE TABLE
    products (
        p_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (user_Id),
        productName VARCHAR(255),
        productImage VARCHAR(255),
        productActualPrice INT,
        prdouctOfferPrice INT,
        productSize VARCHAR(10),
        productRating INT,
        productReviews INT
    );

INSERT INTO
    products (
        user_id,
        productName,
        productImage,
        productActualPrice,
        prdouctOfferPrice,
        productSize,
        productRating,
        productReviews
    )
VALUES
    (
        2,
        'Mens Military Style Black Cargo Short',
        'https://i5.walmartimages.com/asr/2c7dcfbe-51fa-41c4-a152-250894cc8f4f_1.534bc791c4e331f5c9bf1e34b032fdb8.jpeg',
        50.00,
        40.00,
        'M',
        4.5,
        25
    ),
    (
        2,
        'Womens Plus Size Lace Ruffle Sleeve Short Sleeve Top',
        'https://i5.walmartimages.com/asr/3a12ee0c-ae51-4f4f-9ab3-1bfc567d7a77.e369204ef6234dd795d89c3163715aff.jpeg',
        75.00,
        60.00,
        'L',
        4.0,
        18
    ),
    (
        2,
        'men cross body bag',
        'https://th.bing.com/th/id/OIP.Qny3mM9TYLren0trfJr5pAHaHa?rs=1&pid=ImgDetMain',
        30.00,
        25.00,
        'S',
        4.8,
        32
    );