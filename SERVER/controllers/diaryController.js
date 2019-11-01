import diaries from '../models/diary';


class DiaryController {
  static createEntry(req, res) {
    const { title, description } = req.body;
    const userId = diaries.length + 1;
 
    const date = new Date();
    const diary = { userId, title, description, createdOn: date };
    diaries.push(diary);
    return res.status(200).json({
      status: 200,
      message: 'entry successfully created',
      data: diary
    });
  }

  static findEntry(req, res) {
    const entryId = req.params.id;
    const diary = diaries.find(d => d.id === parseInt(entryId));
    if(!diary);
  }
}

export default DiaryController;
