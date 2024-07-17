// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:resaapp/addReserve.dart';
import 'package:resaapp/app/auth/home.dart';

class ClientReservation {
  final String clientName;
  final List<String> reservations;

  ClientReservation(this.clientName, this.reservations);
}

class PArtenaria extends StatefulWidget {
  @override
  _PArtenariaState createState() => _PArtenariaState();
}

class _PArtenariaState extends State<PArtenaria> {
  List<ClientReservation> clients = [
    ClientReservation('Client 1', ['Reservation 1']),
    ClientReservation('Client 2', ['Reservation 3']),
    ClientReservation('Client 3', ['Reservation 5']),
    // Add more clients and their reservations as needed
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('demande de partenariat'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ],
        elevation: 10,
        leadingWidth: 80,
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.white,
              ),
              child: Text(
                'Menu',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              title: Text('Home'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Home()),
                );
              },
            ),
            ListTile(
              title: Text('Reservations'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AddNew()),
                );
              },
            ),
            ListTile(
              title: Text('Demande de partenariat'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => PArtenaria()),
                );
              },
            ),
          ],
        ),
      ),
        bottomNavigationBar: BottomAppBar(
  color: Colors.transparent, // Transparent background color
  elevation: 0, // No shadow
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      IconButton(
        icon: Icon(Icons.arrow_back),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
      Image.asset(
        'assets/restaurant spectacle.png',
        width: 80,
        height: 80,
      ),
    ],
  ),
),
      body: ListView.builder(
        itemCount: clients.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(clients[index].clientName),
            textColor: Colors.white,
            onTap: () {
              _showReservationDetails(clients[index]);
            },
          );
        },
      ),
    );
  }

  void _showReservationDetails(ClientReservation client) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('nouvelle demande de partenariat'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Client: ${client.clientName}'),
              Divider(),
              for (var reservation in client.reservations)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Nom de l\'établissement :'), // Replace <date> with the actual date
                    Text('Type d\'établissement : '), // Replace <hours> with the actual hours
                    Text('Nom de contac : '), // Replace <adults> with the actual number of adults
                    Text('Fonction : '), // Replace <enfants> with the actual number of children
                    Text('Email :'),
                    Text('Téléphone :'),
                    Divider(),
                  ],
                ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                // Handle confirmation action
                _confirmReservation();
              },
              child: Text('Confirmé'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Annuler'),
            ),
          ],
        );
      },
    );
  }

  void _confirmReservation() {
    // Implement confirmation logic here
    // For example, navigate to a page with confirmed reservations
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => Home()),
    );
  }
}
