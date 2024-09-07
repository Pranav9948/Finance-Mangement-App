import 'package:flutter/material.dart';


// Dummy data for categories with network image URLs


final List<Map<String, String>> categories = [
  {'name': 'Mobiles', 'imageUrl': 'https://plus.unsplash.com/premium_photo-1681666713741-3e307db44f68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlfGVufDB8fDB8fHww'},
  {'name': 'Cars', 'imageUrl': 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D'},
  {'name': 'Bikes', 'imageUrl': 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW90b3JiaWtlfGVufDB8fDB8fHww'},
  {'name': 'Electronics', 'imageUrl': 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D'},
  {'name': 'Furniture', 'imageUrl': 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8fDB8fHww'},
  {'name': 'Fashion', 'imageUrl': 'https://plus.unsplash.com/premium_photo-1707932495000-5748b915e4f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D'},
  {'name': 'Books', 'imageUrl': 'https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D'},
  {'name': 'Sports', 'imageUrl': 'https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzfGVufDB8fDB8fHww'},
  
];
// Dummy data for featured products
// Dummy data for featured products
final List<Map<String, String>> featuredProducts = [
  {
    'name': 'Hp 12s',
    'imageUrl': 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
    'price': '\$1200',
    'location': 'Kochi, ',
    'postedDate': '2 days ago'
  },
  {
    'name': 'Real me 14 pro',
    'imageUrl': 'https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlfGVufDB8fDB8fHww',
    'price': '\$800',
    'location': 'Trivandrum, ',
    'postedDate': '5 days ago'
  },
];

// Dummy data for mobile products
final List<Map<String, String>> mobileProducts = [
  {
    'name': 'iPhone 13',
    'imageUrl': 'https://plus.unsplash.com/premium_photo-1705022119961-2cc016ae074f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    'price': '\$999',
    'location': 'Kochi',
    'postedDate': '1 week ago'
  },
  {
    'name': 'Samsung Galaxy S21',
    'imageUrl': 'https://images.unsplash.com/photo-1507955987999-df4864ee80d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Ftc3VuZ3xlbnwwfHwwfHx8MA%3D%3D',
    'price': '\$850',
    'location': 'Kochi',
    'postedDate': '3 days ago'
  },
];
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('OLX App')),
        body: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Browse Categories Section
              BrowseCategories(categories: categories),
              SizedBox(height: 26),
              // Featured Section
              FeaturedSection(featuredProducts: featuredProducts),
              SizedBox(height: 26),
              // Mobiles Section
              MobilesSection(mobileProducts: mobileProducts),
            ],
          ),
        ),
      ),
    );
  }
}

class BrowseCategories extends StatelessWidget {
  final List<Map<String, String>> categories;

  const BrowseCategories({required this.categories});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            'Browse Categories',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(height: 16),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: categories.map((category) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: CategoryItem(
                  imageUrl: category['imageUrl']!,
                  name: category['name']!,
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class CategoryItem extends StatelessWidget {
  final String imageUrl;
  final String name;

  const CategoryItem({
    required this.imageUrl,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            image: DecorationImage(
              image: NetworkImage(imageUrl),
              fit: BoxFit.cover,
            ),
          ),
        ),
        SizedBox(height: 8), // Space between image and text
        Text(
          name,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}

class FeaturedSection extends StatelessWidget {
  final List<Map<String, String>> featuredProducts;

  const FeaturedSection({required this.featuredProducts});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Featured (10+)',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () {},
                child: Text(
                  'See More',
                  style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: featuredProducts.map((product) {
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: ProductCard(
                    imageUrl: product['imageUrl']!,
                    name: product['name']!,
                    price: product['price']!,
                    location: product['location']!,
                    postedDate: product['postedDate']!,
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class MobilesSection extends StatelessWidget {
  final List<Map<String, String>> mobileProducts;

  const MobilesSection({required this.mobileProducts});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Mobiles',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () {},
                child: Text(
                  'See More',
                  style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: mobileProducts.map((product) {
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: ProductCard(
                    imageUrl: product['imageUrl']!,
                    name: product['name']!,
                    price: product['price']!,
                    location: product['location']!,
                    postedDate: product['postedDate']!,
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class ProductCard extends StatelessWidget {
  final String imageUrl;
  final String name;
  final String price;
  final String location;
  final String postedDate;

  const ProductCard({
    required this.imageUrl,
    required this.name,
    required this.price,
    required this.location,
    required this.postedDate,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 150,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(imageUrl),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.vertical(top: Radius.circular(8.0)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              name,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text(
              price,
              style: TextStyle(fontSize: 14, color: Colors.green),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  location,
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                Text(
                  postedDate,
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
