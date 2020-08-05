class ApiFeatures {
    constructor(query, queryString,model) {
        this.query = query;
        this.queryString = queryString;
        this.model = model;
    }

    filter() {
        // filtering
        const queryObj = {
            ...this.queryString.query
        };
        const excludedFields = ["sort", "limit", "page", "fields"];
        excludedFields.forEach((key) => {
            delete queryObj[key];
        });

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/gte|gt|lte|lt/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryString));

        return this;
    }

    sort() {
        // sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-releasedYear");
        }
        return this;
    }

    limit() {
        // limit fields
        if (this.queryString.fields) {

            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }

    async paginate() {
        // pagination 
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        if (this.queryString.page) {
            const numdocs = await this.model.countDocuments();
            if (skip >= numdocs) {
                throw new Error("This page doesn't exist");
            }
        }
        return this;
    }
}

module.exports = ApiFeatures;