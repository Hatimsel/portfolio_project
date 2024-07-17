// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:resaapp/addReserve.dart';
import 'package:resaapp/app/auth/home.dart';

class ClientReservation {
  final String clientName;
  final List<String> reservations;

  ClientReservation(this.clientName, this.reservations);
}


class ClientListPage extends StatefulWidget {
  @override
  _ClientListPageState createState() => _ClientListPageState();
}

class _ClientListPageState extends State<ClientListPage> {
  int? selectedClientIndex;
  List<ClientReservation> clients = [
    ClientReservation('Client 1', ['Reservation 1', 'Reservation 2']),
    ClientReservation('Client 2', ['Reservation 3', 'Reservation 4']),
    // Add more clients and their reservations as needed
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Clients des Reservations'),
        // title: const Text("Demande de partenariat"),
       // backgroundColor: Colors.transparent,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ],
        elevation: 10,
        leadingWidth: 80,
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
),drawer: Drawer(
    child: ListView(
      children: [
        const DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.white,
          ),
          child: Text(
            'Menu',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
            ListTile(
              title: const Text('Home'),
              onTap: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (context) => Home()));
              },
            ),
            ListTile(
              title: const Text('Reservations'),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => AddNew()));
              },
            ),
            ListTile(
              title: const Text('Demande de partenariat'),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => ClientListPage()));
              },
            ),
          ],
        ),
      ),
      body: ListView.builder(
        itemCount: clients.length,
        itemBuilder: (context, index) {
          return Column(
          //i child : Text('Clients and Reservations'),
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ListTile(
                title: Text(clients[index].clientName),
                textColor: Colors.white,
                onTap: () {
                  setState(() {
                    if (selectedClientIndex == index) {
                      selectedClientIndex = null; // Toggle selection off
                    } else {
                      selectedClientIndex = index;
                    }
                  });
                },
              ),
              if (selectedClientIndex == index)
                Column(
                  children: clients[index].reservations
                      .map((reservation) => ListTile(
                            title: Text(reservation),
                            textColor: Colors.white,
                          //  tileColor: Colors.grey[200],
                            onTap: () {
                              _showReservationDetails(reservation);
                            },
                          ))
                      .toList(),
                ),
              Divider(),
            ],
          );
        },
      ),
    );
  }

  void _showReservationDetails(String reservation) {
  showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text('Reservation Details'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('La date:'), // Replace <date> with the actual date
            Text('Hours:'), // Replace <hours> with the actual hours
            Text('Adults:'), // Replace <adults> with the actual number of adults
            Text('Enfants: '), // Replace <enfants> with the actual number of children
            Text('Note:'), // Replace <note> with the actual note
          ],
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              // Handle confirmation action
              _confirmReservation();
            },
            child: Text('Confirm'),
          ),

          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: Text('Close'),
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
void _cancelReservation() {
  // Implement cancellation logic here
}
}
