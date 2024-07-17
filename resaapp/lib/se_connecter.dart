// ignore_for_file: prefer_const_constructors
import 'package:resaapp/addReserve.dart';
import 'package:flutter/material.dart';
import 'package:resaapp/app/auth/login.dart';
import 'package:resaapp/app/auth/msg.dart';
import 'package:resaapp/monsold.dart';
class SeConnecter extends StatelessWidget {
  const SeConnecter({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
          appBar: AppBar(
       // backgroundColor: Colors.transparent,
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
        body:
        Container(
        child: Center(
      child: Column(children: [
      const Padding(
          padding: EdgeInsets.all(100.0),),
        MaterialButton(
          onPressed: ()  {
        Navigator.push(context, MaterialPageRoute(builder: (context) =>
      ConsultBalancePage()));
          },
          color:Color.fromRGBO(244, 243, 242, 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20)
          ),
          minWidth: 350.0, 
          height: 80.0,
          child: const Text("Consulté mon solde ", style: TextStyle(fontSize:30,color: Color.fromARGB(255, 5, 5, 5),fontFamily:"Lora",fontWeight: FontWeight.bold)),
        ),
        SizedBox(height: 20),
        MaterialButton(
          onPressed: ()  {
        Navigator.push(context, MaterialPageRoute(builder: (context) => AddNew()));
          },
          color:Color.fromRGBO(251, 249, 246, 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20)
          ),
          minWidth: 350.0, 
          height: 80.0,
          child: const Text("Nouvelle Réservation",
          style: TextStyle(fontSize:30,color: Color.fromARGB(255, 10, 10, 10),fontFamily:"Lora",fontWeight: FontWeight.bold)),
        ),
      SizedBox(height: 20),
        MaterialButton(
          onPressed: ()  {
        Navigator.push(context, MaterialPageRoute(builder: (context) => Msg()));
          },
          color:Color.fromRGBO(255, 253, 250, 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20)
          ),
          minWidth: 350.0,
          height: 80.0,
          child: const Text("Services", style: TextStyle(fontSize:30,color: Color.fromARGB(255, 11, 11, 11),fontWeight: FontWeight.bold,fontFamily: "Lora")),
        ),
        
      ]),
    )));
  }
}