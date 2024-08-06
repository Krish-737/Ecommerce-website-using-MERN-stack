class apifeatures{
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }

    search(){
        let keyword=this.querystr.keyword ?{
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            }
        }:{};
        this.query.find({...keyword})
        return this;
    }
    filter(){
        let querycopystr={...this.querystr}

        const removefields=['keyword','page','limit']
        removefields.forEach(fields=>delete querycopystr[fields])
        let querystr=JSON.stringify(querycopystr)
        
        querystr=querystr.replace(/\b(gt|gte|lt|lte)/g, match=>`$${match}`)
        this.query.find(JSON.parse(querystr))

        return this;

    }
    paginate(resperpage){
        const currentPage=this.querystr.page||1;
        const skip=resperpage*(currentPage-1)
        this.query.limit(resperpage).skip(skip)
        return this;


    }
}
module.exports=apifeatures;