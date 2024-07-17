import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:resaapp/constant/linkapi.dart';
import 'package:resaapp/main.dart';
class Crud {
  getRequest(String usrl) async {
    try {
      var reponse = await http.get(Uri.parse(usrl));
      if (reponse.statusCode == 200) {
        var responsebody = jsonDecode(reponse.body);
        return responsebody;
      } else {
        return "failed ${reponse.statusCode}";
      }
    } catch (e) {
    //  print("error $e");
    }
  }

  postRequest(String usrl, Map data) async {
    try {
      var reponse = await http.post(Uri.parse(usrl), body: data);
      if (reponse.statusCode == 200) {
        var responsebody = jsonDecode(reponse.body);

        return responsebody;
      } else {
        return "failed ${reponse.statusCode}";
      }
    } catch (e) {
    //  print("error $e");
    }
  }
}

Future<void> createUser(String email, String password) async {
  var url = Uri.parse(linkSingin);
  var response = await http.post(url,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }));

  if (response.statusCode == 200) {
    print('User created: ${response.body}');
  } else {
    throw Exception('Failed to create user.');
  }
}
Future<bool> authenticateUser(String email, String password, String endpoint) async {
  var url = Uri.parse("$linkServerName/$endpoint");
  var response = await http.post(url,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }));

  if (response.statusCode == 200) {
    print('Authentication successful: ${response.body}');
    await prefs!.setString('user_id', jsonDecode(response.body)['user']['_id'].toString());
    await prefs!.setString('role', jsonDecode(response.body)['user']['role'].toString());
    print('User ID stored: ${prefs!.getString('user_id')}');
    return true;
  } else {
    print('Failed to authenticate: ${response.body}');
    return false;
  }
}

Future<bool> submitPartnershipRequest({
  required String establishmentName,
  required String establishmentType,
  required String contactName,
  required String role,
  required String email,
  required String phone,
}) async {
  var url = Uri.parse("$linkServerName/api/partnership"); 
  var response = await http.post(url,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'establishmentName': establishmentName,
        'establishmentType': establishmentType,
        'contactName': contactName,
        'role': role,
        'email': email,
        'phone': phone,
      }));

  if (response.statusCode == 200 || response.statusCode == 201) {
    print('Partnership request submitted successfully: ${response.body}');
    return true;
} else {
    print('Failed to submit partnership request: ${response.body}');
    return false;
}

}

Future<bool> submitreservation({
  required String userId,
  required String date,
  required String adults,
  required String enfants,
  required String hours,
  required String note,
  //required String status,
}) async {
  var url = Uri.parse("$linkServerName/api/reservations"); 
  var response = await http.post(url,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    body: jsonEncode({
    'userId': userId,
    'date': date,
    'adults': adults,
    'enfants': enfants,
    'hours': hours,
    'note': note,
  //  'status': status,
      }));

  if (response.statusCode == 200 || response.statusCode == 201) {
    print('reservation request submitted successfully: ${response.body}');
    return true;
} else {
    print('Failed to submit reservation request: ${response.body}');
    return false;
}
}
/*Future<List<Reservation>> fetchReservationsByUserId(String userId) async {
  var url = Uri.parse('$linkServerName/api/reservations?userId=$userId');
  var response = await http.get(url);
print('API Response: ${response.body}');  
  if (response.statusCode == 200) {
    List<dynamic> reservationsJson = json.decode(response.body);
    return reservationsJson.map((json) => Reservation.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load reservations for user ID $userId');
  }
}*/
