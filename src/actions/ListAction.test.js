const rewire = require("rewire")
const ListAction = rewire("./ListAction")
const isFetching = ListAction.__get__("isFetching")
const fetchSuccess = ListAction.__get__("fetchSuccess")
// @ponicode
describe("ListAction.fetchListData", () => {
    test("0", () => {
        let callFunction = () => {
            ListAction.fetchListData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isFetching", () => {
    test("0", () => {
        let callFunction = () => {
            isFetching()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("ListAction.initData", () => {
    test("0", () => {
        let callFunction = () => {
            ListAction.initData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetchSuccess", () => {
    test("0", () => {
        let callFunction = () => {
            fetchSuccess("4.0.0-beta1\t")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetchSuccess("v1.2.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetchSuccess("v4.0.0-rc.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetchSuccess("^5.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetchSuccess("1.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetchSuccess(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
