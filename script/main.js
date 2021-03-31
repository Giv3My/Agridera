var app = new Vue({
    el: "#prod",
    data:{
        products: [
            {id:1, title:"TAG 1000 (TAG 853)", short_text:"Red Wing", image:"1.jpg", desc:"Full desc"},
            {id:2, title:"TAG 1001 (TAG 855)", short_text:"Leeks", image:"2.jpg", desc:"Full desc"},
            {id:3, title:"TAG 1002 (TAG 809)", short_text:"Vidalia Onions", image:"3.jpg", desc:"Full desc"},
            {id:4, title:"TAG 1003 (TAG 834)", short_text:"Pearl Onions", image:"4.jpg", desc:"Full desc"},
            {id:5, title:"TAG 1004 (TAG 848)", short_text:"Welsh Onions", image:"5.jpg", desc:"Full desc"}
        ],
        product:[],
        cart: [],
        contactFields: [],
        btnVisible: 0,
        formVisible: 1
    },
    methods:{
        getProduct: function(){
            if(window.location.hash){
                var id = window.location.hash.replace('#','')
                if(this.products && this.products.length > 0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id == this.products[i].id) 
                            this.product = this.products[i]
                    }
                }
            }
        },

        addToCart: function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',')
            }

            if(cart.indexOf(String(id)) == -1){
                cart.push(id)
                window.localStorage.setItem('cart', cart.join())
                this.btnVisible = 1
            }
        },

        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1)
                this.btnVisible = 1
        },

        getCart: function (){
            var cart = []
            cart = window.localStorage.getItem('cart').split(',')
            for (i in this.products){
                if (cart.indexOf(String(this.products[i].id)) != -1){
                    this.cart.push(this.products[i])
                }
            }
        },

        removeFromCart: function (id){
            var cart = []
            cart = window.localStorage.getItem('cart').split(',')
            cart = cart.filter(i => i != id)
            window.localStorage.setItem('cart', cart.join())
            this.cart = this.cart.filter(i => i.id != id)
        },

        makeOrder: function (){
            window.localStorage.clear()
            this.cart.splice(0, this.cart.length)
            this.formVisible = 0
        },
    },

    mounted:function(){
        this.getProduct()
        this.checkInCart()
        this.getCart()
    },
})