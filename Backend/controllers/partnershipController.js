const PartnershipRequest = require('../models/partnershipRequestModel');

exports.submitRequest = async (req, res) => {
  const { establishmentName, establishmentType, contactName, role, email, phone } = req.body;

  try {    
    const newRequest = new PartnershipRequest({
      establishmentName,
      establishmentType,
      contactName,
      role,
      email,
      phone
    });

    await newRequest.save();

    return res.status(201).send({
      message: 'Partnership request submitted successfully.'
    });
  } catch (error) {
    return res.status(400).send({
      message: 'Failed to submit partnership request.', error: error.message
    });
  }
};
