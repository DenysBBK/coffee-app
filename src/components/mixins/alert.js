export default{
    data(){
        return{
            showAlert:false,
            typeOfAlert:'',
            alertText:''
        }
    },
    methods:{
        useAlert(type, text){
            this.showAlert = true;
            this.typeOfAlert = type;
            this.alertText = text
        },
        closeAlert(){
            this.showAlert = false
        }
    },
    watch:{
        showAlert(newValue){
            if(newValue == true){
                setTimeout(() => {
                    this.showAlert = false
                },4000)
            }
        }
    }
}