
import 'package:resaapp/app/auth/home.dart';
import 'package:resaapp/app/auth/msg.dart';
import 'package:resaapp/controller/conx.dart';
import 'package:resaapp/se_connecter.dart';
import 'package:resaapp/smallframework/customTextform.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);
  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  Crud crud = Crud();
  TextEditingController name = TextEditingController();
  TextEditingController psd = TextEditingController();
  String? role;
  Future<String?> getUserId() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('role');
  }
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () async {
      await getUserId().then((fetchedrole) {
        setState(() {
        role = fetchedrole;
        });
      });
    });
  }

void _login() {
    if (psd.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Mot de passe est requis'),
          duration: Duration(seconds: 2),
        ),
      );
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Home()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
          
        child:SingleChildScrollView(
      child: Column(children: [
      const Padding(
          padding: EdgeInsets.all(100.0),),
          Image.asset(
      'assets/1.png',
      width: 250,
      height: 250,
    ),        SizedBox(height: 20),

        CustomTextFormSing(mycontroller: name, hint: "Email / Numéro "),
        SizedBox(height: 20),
        SizedBox(width: 400,height: 70,
      child: TextFormField(
        style: const TextStyle(fontSize: 25, color: Color.fromARGB(255, 255, 255, 255), fontFamily: "Lora", ),
        controller: psd,
        obscureText: true,
        decoration: InputDecoration(
          hintText: 'Mot de pass',
          hintStyle: TextStyle(color: Colors.white),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20),
            borderSide:const BorderSide(color: Color.fromRGBO(251, 251, 251, 1), width: 10),
          ),
        ),
      ),
    ),
        SizedBox(height: 20),
      Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[ Padding(
padding: EdgeInsets.only(right: 10.0),
child :
MaterialButton(
  onPressed: () async {
    if (name.text.isNotEmpty && psd.text.isNotEmpty) {
      bool loginSuccess = await authenticateUser(name.text, psd.text, "login");
      if (loginSuccess) {
    if (role == 'admin') {
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => SeConnecter()));
      } else {
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Msg()));
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('La connexion a échoué. Veuillez vérifier vos identifiants.')),
      );
    }
  } else {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('L\'email et le mot de passe sont requis.')),
    );
  }
},
  color: Color.fromRGBO(252, 251, 251, 1),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16)
  ),
  minWidth: 200.0,
  height: 50.0,
  child: const Text("Se connecter", style: TextStyle(fontSize:25, color: Color.fromARGB(255, 6, 6, 6), fontFamily:"Lora", fontWeight: FontWeight.bold)),
)
,),

      MaterialButton(
  onPressed: () async{
    if (name.text.isNotEmpty && psd.text.isNotEmpty) {
     await createUser(name.text, psd.text).then((_) {
        Navigator.push(context, MaterialPageRoute(builder: (context) => Home()));
      }).catchError((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error.toString())),
        );
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Email and password are required')),
      );
    }
  },
  color: Color.fromRGBO(249, 248, 247, 1),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16)
  ),
  minWidth: 200.0,
  height: 50.0,
  child: const Text("Inscription", style: TextStyle(fontSize:25, color: Color.fromARGB(255, 15, 14, 14), fontFamily:"Lora", fontWeight: FontWeight.bold)),
)]),
SizedBox(height: 80),
 Container(
            padding: EdgeInsets.symmetric(vertical: 8.0 , horizontal: 12.0),

            //color: Colors.grey.withOpacity(0.1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                // Language icon
                Icon(Icons.language, color: Colors.white),
               // Size
                 TextButton(onPressed: () {}, child: Text('FR', style: TextStyle(color: Colors.white))),
              ],
            ),
          ),
      ]),
    )
    ));
  }
}
