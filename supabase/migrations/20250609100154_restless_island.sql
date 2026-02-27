/*
# Seed Initial Data

1. Insert sample products
2. Insert sample testimonials
3. Insert sample events
4. Insert sample blog posts
*/

-- Insert sample products
INSERT INTO products (name, description, price, special_price, category, image_url, ingredients, allergens, is_special) VALUES
('Artisan Sourdough Loaf', 'Traditional sourdough with a crispy crust and tangy flavor, made with our 100-year-old starter.', 1105, 975, 'bread', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Organic flour', 'Water', 'Sea salt', 'Sourdough starter'], ARRAY['Gluten'], true),
('Whole Wheat Bread', 'Hearty whole wheat bread packed with nutrients and fiber.', 780, null, 'bread', 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Whole wheat flour', 'Water', 'Yeast', 'Honey', 'Salt'], ARRAY['Gluten'], false),
('French Baguette', 'Classic French baguette with a golden crust and airy interior.', 585, null, 'bread', 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Bread flour', 'Water', 'Yeast', 'Salt'], ARRAY['Gluten'], false),
('Pain au Chocolat', 'Buttery, flaky croissant filled with rich dark chocolate.', 490, 420, 'pastry', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', ARRAY['Butter', 'Flour', 'Dark chocolate', 'Eggs', 'Milk'], ARRAY['Gluten', 'Dairy', 'Eggs'], true),
('Almond Croissant', 'Delicate croissant filled with sweet almond cream and topped with sliced almonds.', 550, null, 'pastry', 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Butter', 'Flour', 'Almond cream', 'Sliced almonds', 'Sugar'], ARRAY['Gluten', 'Dairy', 'Nuts'], false),
('Fruit Danish', 'Light and flaky Danish pastry topped with seasonal fruit and glaze.', 455, null, 'pastry', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Pastry dough', 'Seasonal fruit', 'Cream cheese', 'Sugar glaze'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),
('Triple Chocolate Layer Cake', 'Decadent three-layer chocolate cake with rich chocolate ganache.', 5850, null, 'cake', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Dark chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),
('Red Velvet Cake', 'Classic red velvet cake with cream cheese frosting.', 5460, 4940, 'cake', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Flour', 'Cocoa powder', 'Red food coloring', 'Cream cheese', 'Butter'], ARRAY['Gluten', 'Dairy', 'Eggs'], true),
('Chocolate Chip Cookies', 'Classic chocolate chip cookies with a perfect chewy texture.', 325, null, 'cookie', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Flour', 'Chocolate chips', 'Butter', 'Brown sugar', 'Eggs'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),
('Oatmeal Raisin Cookies', 'Hearty oatmeal cookies studded with plump raisins.', 290, null, 'cookie', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Oats', 'Flour', 'Raisins', 'Butter', 'Cinnamon'], ARRAY['Gluten', 'Dairy'], false),
('Gluten-Free Almond Bread', 'Moist and flavorful bread made with almond flour.', 1560, null, 'gluten-free', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Almond flour', 'Eggs', 'Honey', 'Baking soda', 'Salt'], ARRAY['Nuts', 'Eggs'], false),
('Gluten-Free Chocolate Muffins', 'Rich chocolate muffins that are completely gluten-free.', 585, null, 'gluten-free', 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Rice flour', 'Cocoa powder', 'Chocolate chips', 'Eggs', 'Coconut oil'], ARRAY['Eggs'], false);

-- Insert sample testimonials
INSERT INTO
    testimonials (
        name,
        content,
        rating,
        image_url,
        is_approved
    )
VALUES (
        'Sarah Johnson',
        'The best bakery in town! Their sourdough bread is absolutely incredible, and the staff is always so friendly. I come here every weekend for fresh pastries.',
        5,
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    ),
    (
        'Michael Chen',
        'Ordered a custom wedding cake and it exceeded all expectations. Not only was it beautiful, but it tasted amazing too. Highly recommend for special occasions!',
        5,
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    ),
    (
        'Emily Rodriguez',
        'As someone with gluten sensitivity, I was thrilled to find such delicious gluten-free options. The almond bread is my new favorite!',
        5,
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    ),
    (
        'David Thompson',
        'The croissants here are just like the ones I had in Paris. Buttery, flaky, and absolutely perfect. Worth every penny!',
        5,
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    ),
    (
        'Lisa Park',
        'Great selection of fresh baked goods daily. The chocolate chip cookies are my kids'' absolute favorite. We''re regular customers now!',
        5,
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    ),
    (
        'Robert Wilson',
        'Fantastic bakery with authentic recipes. The French baguettes are crispy on the outside and soft inside, just perfect for our family dinners.',
        5,
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        true
    );

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, duration, location, price, max_participants, instructor, difficulty, category, image_url, includes, requirements) VALUES
('Sourdough Bread Making Workshop', 'Learn the ancient art of sourdough bread making from our master baker. You''ll create your own starter and take home fresh bread.', '2024-02-15', '10:00', '4 hours', 'Main Bakery Kitchen', 11050, 12, 'Marie Dubois', 'Beginner', 'Workshop', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['All ingredients', 'Recipe booklet', 'Sourdough starter', 'Fresh bread to take home', 'Light lunch'], ARRAY['Apron (provided)', 'Comfortable shoes']),
('French Pastry Masterclass', 'Master the delicate techniques of French pastry making including croissants, éclairs, and macarons.', '2024-02-18', '09:00', '6 hours', 'Professional Kitchen', 19500, 8, 'James Wilson', 'Advanced', 'Class', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', ARRAY['Premium ingredients', 'Professional techniques guide', 'Pastries to take home', 'Certificate of completion', 'Gourmet lunch'], ARRAY['Basic baking knowledge', 'Comfortable clothing']),
('Valentine''s Day Cake Decorating', 'Create beautiful Valentine''s themed cakes with professional decorating techniques and romantic designs.', '2024-02-12', '14:00', '3 hours', 'Decorating Studio', 8450, 15, 'Sofia Rodriguez', 'Intermediate', 'Special Event', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Pre-baked cake', 'All decorating supplies', 'Design templates', 'Decorated cake to take home', 'Refreshments'], ARRAY['No experience necessary']),
('Kids Baking Adventure', 'A fun-filled baking session designed for children aged 8-14. Learn to make cookies, cupcakes, and simple breads.', '2024-02-20', '11:00', '2.5 hours', 'Kids Kitchen', 5850, 16, 'David Chen', 'Beginner', 'Workshop', 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['All ingredients', 'Kid-friendly tools', 'Recipe cards', 'Baked goods to take home', 'Fun activities'], ARRAY['Adult supervision for children under 10', 'Closed-toe shoes']),
('Gluten-Free Baking Essentials', 'Discover the secrets of successful gluten-free baking with alternative flours and binding techniques.', '2024-02-25', '13:00', '3.5 hours', 'Specialty Kitchen', 9750, 10, 'Marie Dubois', 'Intermediate', 'Class', 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Gluten-free ingredients', 'Flour blend recipes', 'Multiple baked items', 'Nutritional guide', 'Light refreshments'], ARRAY['Basic baking knowledge helpful']);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, tags, image_url, read_time, is_published) VALUES
('The Art of Sourdough: A Beginner''s Guide', 'Learn the ancient art of sourdough baking with our step-by-step guide to creating your own starter and baking perfect loaves.', 'Sourdough baking is both an art and a science that has been practiced for thousands of years. In this comprehensive guide, we''ll walk you through everything you need to know to start your sourdough journey...', 'Marie Dubois', 'Baking Tips', ARRAY['sourdough', 'bread', 'beginner', 'starter'], 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', '8 min read', true),
('Seasonal Ingredients: Winter Baking Favorites', 'Discover how to incorporate seasonal winter ingredients into your baking for flavors that capture the essence of the season.', 'Winter brings a wonderful array of ingredients that can transform your baking. From warming spices like cinnamon and nutmeg to seasonal fruits like pears and cranberries...', 'James Wilson', 'Seasonal', ARRAY['seasonal', 'winter', 'ingredients', 'flavors'], 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', '6 min read', true),
('Decorating Techniques for Professional-Looking Cakes', 'Master the art of cake decoration with these professional techniques that will make your homemade cakes look bakery-perfect.', 'Creating beautiful cakes is about more than just taste – presentation matters too. In this detailed guide, we''ll share the professional techniques we use daily...', 'Sofia Rodriguez', 'Cake Decorating', ARRAY['cakes', 'decorating', 'techniques', 'professional'], 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', '12 min read', true),
('The Science Behind Perfect Pastry', 'Understanding the science behind pastry making will help you achieve consistent, flaky, and delicious results every time.', 'Pastry making is a precise science where temperature, timing, and technique all play crucial roles. Understanding these fundamentals will elevate your baking...', 'David Chen', 'Baking Science', ARRAY['pastry', 'science', 'technique', 'baking'], 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', '10 min read', true),
('Gluten-Free Baking: Tips and Tricks', 'Navigate the world of gluten-free baking with confidence using our tested tips and favorite flour blends.', 'Gluten-free baking doesn''t have to be intimidating. With the right knowledge and techniques, you can create delicious baked goods that everyone will enjoy...', 'Marie Dubois', 'Dietary', ARRAY['gluten-free', 'dietary', 'tips', 'flour'], 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', '7 min read', true);