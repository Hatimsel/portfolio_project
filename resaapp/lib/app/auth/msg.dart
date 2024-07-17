import 'package:flutter/material.dart';
import 'package:resaapp/app/auth/login.dart';

class Msg extends StatelessWidget {
  const Msg({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(0, 0, 0, 0),
        actions: [
          IconButton(
  icon: const Icon(Icons.logout),
 onPressed: () {
   Navigator.pushReplacement(
     context,
     MaterialPageRoute(builder: (context) => Login()),
    );
   //  Navigator.pop(context);
  },
),
        ],
      ),
      body: Container(
        /* decoration: BoxDecoration(
   image: DecorationImage(
     image: AssetImage("assets/img2.jpg"),
     fit: BoxFit.cover,
   ),
 ),    */    padding: const EdgeInsets.all(30.0),
        child: const Text(
          "    Merci d'avoir soumis votre demande de partenariat avec notre application. Votre demande a été reçue avec succès. Votre compte est en cours de validation. Veuillez patienter pendant que nous examinons votre demande. Nous vous contacterons,par mail dès que votre compte aura été approuvé.",
          style:  TextStyle(
            fontSize: 25,
            color: Color.fromARGB(255, 248, 245, 245),
            fontFamily: "Lora",
          ),
        ),
      ),
        );
  }
}
