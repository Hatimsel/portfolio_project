import 'package:resaapp/addReserve.dart';
import 'package:resaapp/administration/demandes.dart';
import 'package:resaapp/administration/newReserv.dart';
import 'package:resaapp/administration/reservationpart.dart';
import 'package:resaapp/app/auth/home.dart';
//import 'package:resaapp/app/auth/msg.dart';
import 'package:flutter/material.dart';

class AdminPage extends StatelessWidget {
  const AdminPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
                    MaterialPageRoute(builder: (context) => PArtenaria()));
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          children: [
            const Padding(
              padding: EdgeInsets.all(120.0),
            ),
            Row(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 23.0),
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => PArtenaria()));
                    },
                    color: Color.fromRGBO(153,119,61,1),
                    elevation: 7,
                    //splashColor: Colors.white,
                    shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                    minWidth: 150.0,
                    height: 150.0,
                    child: const Text("Demande Des\nPartenariats",
                        style: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(255, 255, 255, 255),
                            fontFamily: "Lora",
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0), //
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ClientListPage()));
                    },
                    color: Color.fromRGBO(153,119,61,1),
                    elevation: 7,
                    //splashColor: Colors.white,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    minWidth: 150.0, // Minimum width of the button
                    height: 150.0,
                    child: const Text("Reservations\nPartenaires",
                        style: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(255, 255, 255, 255),
                            fontFamily: "Lora",
                            fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Row(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => AddNewPart()));
                    },
                    color: Color.fromRGBO(153,119,61,1),
                    elevation: 7,
                    //splashColor: Colors.white,
                    shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                    minWidth: 150.0,
                    height: 150.0,
                    child: const Text("Ajouter des\nreservations",
                        style: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(255, 255, 255, 255),
                            fontFamily: "Lora",
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 30.0), // Add margin here
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => AddNew()));
                    },
                    color: Color.fromRGBO(153,119,61,1),
                    elevation: 7,
                    //splashColor: Colors.white,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    minWidth: 150.0, // Minimum width of the button
                    height: 150.0,
                    child: const Text(" Statistiques ",
                        style: TextStyle(
                            fontSize:18,
                            color: Color.fromARGB(255, 255, 255, 255),
                            fontFamily: "Lora",
                            fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
