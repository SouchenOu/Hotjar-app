import Response from '../Modules/Response.js';

export const saveResponse = async (req, res) => {
  try {
    const { userId, surveyId, response, sessionId } = req.body;

    let existingResponse = await Response.findOne({ surveyId, sessionId });
    if (!existingResponse) {
      existingResponse = new Response({
        surveyId,
        userId: userId || null,
        sessionId: sessionId || null,
        responses: [],
      });
    }

    existingResponse.responses.push(response);

    const savedResponse = await existingResponse.save();

    res
      .status(200)
      .json({ message: 'Response saved successfully', data: savedResponse });
  } catch (error) {
    console.error('Error in saveResponse:', error.message);
    res.status(500).json({ message: '', error: error.message });
  }
};

export const getResponseSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await Response.find({ surveyId: id });

    if (responses.length === 0) {
      return res
        .status(201)
        .json({ message: 'No responses found for this survey' });
    }

    return res.status(200).json(responses);
  } catch (error) {
    console.error(error);
  }
};

export const numberResponses = async (req, res) => {
  try {
    const { id } = req.params;
    const responseCount = await Response.countDocuments({ surveyId: id });
    res.status(200).json({ responseCount });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const responseDelete = await Response.findByIdAndDelete(id);
    if (!responseDelete) {
      res.status(400).json({ message: 'Response not found' });
    }
    res.status(200).json({ message: 'Response delete succefully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
