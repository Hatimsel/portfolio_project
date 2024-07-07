import 'package:flutter/material.dart';

class CustomTextFormSing extends StatelessWidget {
  final String hint;
  final TextEditingController mycontroller;
  const CustomTextFormSing({Key? key, required this.hint, required this.mycontroller}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 400,
      height: 70,
      child: TextFormField(
        style: const TextStyle(fontSize: 25, color: Color.fromARGB(255, 255, 255, 255), fontFamily: "Lora", ),
        controller: mycontroller,
                    //  obscureText: true, // Make the text input obscured (dots or stars)

        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.white),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20),
            borderSide:const BorderSide(color: Color.fromRGBO(153,119,61,1)
, width: 10),
          ),
        ),
      ),
    );
  }
}
