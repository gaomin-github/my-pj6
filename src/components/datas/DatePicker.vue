<template>
    <section>
        <h4>日期选择</h4>
        <basic-input></basic-input>
    </section>
</template>
<script lang="ts">
    //电话号码格式校验
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import BasicInput from './BasicInput';
    @Component({
        components:{
            BasicInput
        }
    })
    export default class DatePicker extends Vue{

    }
</script>
<style lang="scss" scoped>

</style>