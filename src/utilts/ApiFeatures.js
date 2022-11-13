
class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    pagination() {
        let page = this.queryString.page * 1 || 1;
        // req.query.page = query param 
        // "ahmed" * 1 = NAN .... NaN || 1 => 1
        // 0 * 1 = 0 .... 0 || 1 => 1
        if (page < 0) page = 1;
        let limit = 5
        let skip = (page - 1) * limit
        // qa3eda thabta be7eth > .skip(0).limit(5) > .skip(5).limit(5) >.skip(10).limit(5)
        this.mongooseQuery.skip(skip).limit(limit);
        this.page = page
        return this;
    }

    filter() {
        let queryString = { ...this.queryString }; // spread operator
        // a5d copy to req.query 3shan a3del 3leha 3n treq "spread operator"
        let excludedQuery = ['page', 'sort', 'keyword', 'fields'];
        // 3mlna el 5atoa de 3shan delete all elements in URL ana mesh ha7tagh fee el 5atow de
        excludedQuery.forEach((elm) => { // the different between map and forEach : map is returned , forEach disn't returned any data
            delete queryString[elm]; // delelet any data i don't needed to this opration
        })

        queryString = JSON.stringify(queryString) // stringify: change json code ==>> string 
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // this step because edafet $ to condition search
        // match: change any data in first prametar in replace to what you do between pikk tek ``
        // gte = akbar men and equal   ,    gt =  akbar men ,    lte = aqal men and equal ,    lt = aqal men
        queryString = JSON.parse(queryString) // parse: change string ==>> json code
        this.mongooseQuery.find(queryString)
        return this;
    }

    // sort: tarteeb any data from small to large and back 
    sort(){
        if (this.queryString.sort) { // if sort in URL
            // lao 3ayz t3kes trteb el search men el kbeer ela elas3'r ekteb naqs apl el kelma methl ==>> "-price"
            let sortedBy = this.queryString.sort.split(',').join(" ");
            // split = delete any comaa "," in array
            // join = replace space between elements in array
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }

    search() {
        if (this.queryString.keyword) { // if keyword = any word to search in URL
            let keyword = this.queryString.keyword; // add this word in var
            this.mongooseQuery.find({ // unfa3 2 find fee function oa7da
                $or: [ // $or is Search feature for more than one item in mongoose
                    { name: { $regex: keyword, $options: "i" } }, // first feature is name
                    { description: { $regex: keyword, $options: "i" } }, // second feature is description
                    // $options: "i" : No difference between uppercase or lowercase letters
                ]
            });
        }
        return this;
    }

    // fields : is A selection will be displayed
    fields(){
        if (this.queryString.fields) { // if fields in URL
            let fields = this.queryString.fields.split(',').join(" ");
            // split = delete any comaa "," in array
            // join = replace space between elements in array
            this.mongooseQuery.select(fields); // select is choose what you want to displayed
        }
        return this;
    }
}

module.exports = ApiFeatures