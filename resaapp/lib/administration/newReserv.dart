// ignore_for_file: constant_identifier_names, prefer_const_constructors

import 'package:resaapp/addReserve.dart';
import 'package:resaapp/administration/reservationpart.dart';
import 'package:resaapp/app/auth/home.dart';
import 'package:resaapp/app/auth/msg.dart';
import 'package:flutter/material.dart';

enum StatusType { Confirme, en_attente, Refuse }

class AddNewPart extends StatefulWidget {
  const AddNewPart({Key? key}) : super(key: key);

  @override
  State<AddNewPart> createState() => _AddNewPartState();
}
class _AddNewPartState extends State<AddNewPart> {
  TextEditingController date = TextEditingController();
  TextEditingController adults = TextEditingController();
  TextEditingController enfants = TextEditingController();
  TextEditingController hours = TextEditingController();
  TextEditingController note = TextEditingController();
  TextEditingController type = TextEditingController();

  StatusType? _selectedType;

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
                    MaterialPageRoute(builder: (context) => ClientListPage()));
              },
            ),
          ],
        ),
      ),
      body: Container(
        margin: EdgeInsets.all(16.0),
        padding: EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Ajouter nouvelle réservation :",
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.white,
                  fontStyle: FontStyle.italic,
                  fontFamily: "Lora",
                ),
              ),
              SizedBox(height: 10),
                TextField(
        maxLines: null, // Allows multiple lines
        decoration: InputDecoration(
          hintText: 'Nom et prenom / Nom de la societe / Numero de telephone :',
          hintStyle: TextStyle(color: Colors.white),
          prefixIcon: Icon(Icons.search, color: Colors.white),
          border: OutlineInputBorder(),

        ),

    ),
              SizedBox(height: 20),
              Row(children: [
                SizedBox(
                    width: 150,
                    height: 60,
                    child: TextFormField(
                      style: const TextStyle(
                        fontSize: 20,
                        color: Color.fromARGB(255, 251, 250, 250),
                        fontFamily: "Lora",
                      ),
                      controller: adults,
                      decoration: InputDecoration(
                        hintText: "Adults :",
                        hintStyle: TextStyle(color: Colors.white),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 10),
                        ),
                      ),
                    )),
                Spacer(),
                SizedBox(
                    width: 150,
                    height: 60,
                    child: TextFormField(
                      style: const TextStyle(
                        fontSize: 20,
                        color: Colors.black,
                        fontFamily: "Lora",
                      ),
                      controller: enfants,
                      decoration: InputDecoration(
                        hintText: "enfants :",
                        hintStyle: TextStyle(color: Colors.white),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 10),
                        ),
                      ),
                    )),
              ]),
              SizedBox(height: 20),
              Row(children: [
                SizedBox(
                    width: 150,
                    height: 60,
                    child: TextFormField(
                      style: const TextStyle(
                        fontSize: 20,
                        color: Colors.black,
                        fontFamily: "Lora",
                      ),
                      controller: date,
                      decoration: InputDecoration(
                        hintText: "Date :",
                        hintStyle: TextStyle(color: Colors.white),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 10),
                        ),
                      ),
                    )),
                Spacer(),
                SizedBox(
                    width: 150,
                    height: 60,
                    child: TextFormField(
                      style: const TextStyle(
                        fontSize: 20,
                        color: Colors.black,
                        fontFamily: "Lora",
                      ),
                      controller: hours,
                      decoration: InputDecoration(
                        hintText: "Hours :",
                        hintStyle: TextStyle(color: Colors.white),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 20),
                        ),
                      ),
                    )),
              ]),
              SizedBox(height: 20),
              Row(
                children: [
                  Text("Satatus : ",
                      style: TextStyle(
                          fontSize: 20,
                          color: Colors.white,
                          fontStyle: FontStyle.italic,
                          fontFamily: "Lora")),
                  DropdownButton<StatusType>(
                    value: _selectedType,
                    onChanged: (value) {
                      setState(() {
                        _selectedType = value;
                      });
                    },
                    items: StatusType.values.map((type) {
                      return DropdownMenuItem<StatusType>(
                        value: type,
                        child: Text(type.toString().split('.').last,
                            style: TextStyle(
                                fontSize: 20,
                                color: const Color.fromARGB(255, 8, 8, 8),
                                fontStyle: FontStyle.italic,
                                fontFamily: "Lora")),
                      );
                    }).toList(),
                  ),
                ],
              ),
              SizedBox(height: 20),
              TextField(
        maxLines: null, // Allows multiple lines
        decoration: InputDecoration(
          hintText: 'Note ...',
          hintStyle: TextStyle(color: Colors.white),
          border: OutlineInputBorder(),
        ),

    ),
              SizedBox(height: 20),
              MaterialButton(
                onPressed: () {
                  Navigator.push(
                      context, MaterialPageRoute(builder: (context) => Msg()));
                },
                color:Color.fromRGBO(254, 253, 252, 1),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30)),
                minWidth: 400.0, // Minimum width of the button
                height: 50.0,
                child: const Text("Ajouter",
                    style: TextStyle(fontSize:20,color: Color.fromARGB(255, 168, 16, 16),fontFamily:"Lora",fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
