class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const skip = (this.queryString.page - 1) * this.queryString.limit;
    this.query = this.query.skip(skip).limit(Number(this.queryString.limit));
    return this;
  }
}

module.exports = APIFeatures;

// BUILD QUERY
// 1A) Filtering
// const { page = 1, limit = 100 } = req.query;
// const queryObj = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => delete queryObj[el]);

// // 1B) Advanced Filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// queryStr = JSON.parse(queryStr);
// let query = Tour.find(queryStr);

// 2) Sorting
// if (sort) {
//   const sortBy = sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

// 3) Fields limiting
// if (fields) {
//   const selectedFields = fields.split(',').join(' ');
//   query = query.select(selectedFields);
// } else {
//   query = query.select('-__v');
// }

// 4) Pagination
// if (page < 1) throw new Error('This page does not exist');
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(Number(limit));
// if (req.query.page) {
//   //  ? if page > 1
//   // ? add middleware for query validation
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('This page does not exist');
// }
