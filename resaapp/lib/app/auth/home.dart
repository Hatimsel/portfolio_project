// ignore_for_file: prefer_const_constructors
import 'package:resaapp/app/auth/login.dart';
import 'package:resaapp/app/auth/msg.dart';
import 'package:resaapp/controller/conx.dart';
import 'package:resaapp/smallframework/customTextform.dart';
import 'package:flutter/material.dart';

enum EstablishmentType { Hotel, Riad, Guide }

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController nom = TextEditingController();
  TextEditingController email = TextEditingController();
  TextEditingController tele = TextEditingController();
  TextEditingController fonction = TextEditingController();
  TextEditingController type = TextEditingController();
  TextEditingController Nom_de_contact = TextEditingController();

  EstablishmentType? _selectedType;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Demande de partenariat"),
        titleTextStyle: TextStyle(
            fontSize: 20,
            color: Colors.white,
           // fontStyle: FontStyle.italic,
            fontFamily: "Lora"),
        backgroundColor: Colors.transparent,
        actions: [
           IconButton(
   icon: const Icon(Icons.logout),
   onPressed: () {
     Navigator.pushReplacement(
       context,
       MaterialPageRoute(builder: (context) => Login()),
     );
   },
 ),
        ],
      ),
      body: Container(
       margin: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Remplir le formulaire suivent :",
                style: TextStyle(
                  color: Color.fromARGB(255, 244, 244, 244),
                  fontSize: 25,
                  fontFamily: "Lora",
                ),
              ),
              SizedBox(height: 10),
              CustomTextFormSing(
                mycontroller: nom,
                hint: "Nom de l'établissement :",
              ),
              SizedBox(height: 15),
              Row(
                children: [
                  Text("Type d'établissement : ",
                      style: TextStyle(
                          fontSize: 25,
                          color: const Color.fromARGB(255, 250, 250, 251),
                          fontFamily: "Lora")),
                  DropdownButton<EstablishmentType>(
                    value: _selectedType,
                    onChanged: (value) {
                      setState(() {
                        _selectedType = value;
                      });
                    },
                    items: EstablishmentType.values.map((type) {
                      return DropdownMenuItem<EstablishmentType>(
                        value: type,
                        child: Text(type.toString().split('.').last,
                            style: TextStyle(
                                fontSize: 20,
                                color: const Color.fromARGB(255, 248, 249, 250),
                                fontFamily: "Lora")),
                      );
                    }).toList(),
                     dropdownColor: Colors.black,
                  ),
                ],
              ),
              SizedBox(height: 20),
              CustomTextFormSing(
                mycontroller: Nom_de_contact,
                hint: "Nom de contact : ",
              ),
              SizedBox(height: 20),
              CustomTextFormSing(
                mycontroller: fonction,
                hint: "Fonction : ",
              ),
              SizedBox(height: 20),
              CustomTextFormSing(
                mycontroller: email,
                hint: "Email :",
              ),
              SizedBox(height: 20),
              CustomTextFormSing(
                mycontroller: tele,
                hint: "Téléphone :",
              ),
              SizedBox(height: 20),
  MaterialButton(
  onPressed: () async {
    if (nom.text.isNotEmpty && email.text.isNotEmpty && tele.text.isNotEmpty && fonction.text.isNotEmpty && _selectedType != null) {
      bool success = await submitPartnershipRequest(
        establishmentName: nom.text,
        establishmentType: _selectedType.toString().split('.').last,
        contactName: Nom_de_contact.text,
        role: fonction.text,
        email: email.text,
        phone: tele.text,
      );
      if (success) {
        if (!mounted) return;
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Msg()));
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit partnership request.')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please fill in all fields.')),
      );
    }
  },
    color: Color.fromRGBO(254, 254, 253, 1),
shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20)),
minWidth: 400.0, // Minimum width of the button
height: 70.0,
child: const Text("Envoyer",
    style: TextStyle(
        fontSize: 30,
        color: Color.fromARGB(255, 3, 3, 3),
        fontFamily: "Lora",
        fontWeight: FontWeight.bold)),
  // Button styling...
),

            ],
          ),
        ),
      ),
    );
  }
}
