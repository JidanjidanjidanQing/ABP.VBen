<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="onCreateClick"><PlusOutlined /><span></span>新增</a-button>
      </template>

      <template #action="{record}">
        <!-- {{record.id}} -->
        <div class="space-x-1">
          <a-button type="warning" @click="onEditClick(record)">{{t('common.edit')}}</a-button>
          <a-button type="danger" @click="onDeleteClick(record.id)">{{t('common.delete')}}</a-button>

        </div>
      </template>

      <template #tableTitle>
          <div class="space-x-1">
          <a-button type="primary">新增</a-button>
          <a-button type="primary">新增</a-button>
        </div>
      </template>
    </BasicTable>


    <BasicModal @register="registerModal">
    
      <BasicForm @register="registerForm">

      </BasicForm>
    
    </BasicModal>



  </PageWrapper>
</template>

<script lang="ts" setup>
  import {BasicTable,useTable,} from '/@/components/Table';
  import {useI18n} from '/@/hooks/web/useI18n';
  import { createMaterialType, deleteMaterialType, getMaterialTypeList, updateMaterialType } from '/@/api/basic/materialType';
  import { FieldBinaryOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicModal,useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MaterialTypeCreateModel } from '/@/api/basic/models/MaterialTypeModel';
  import { nextTick } from 'vue';
  import { formItemProps } from 'ant-design-vue/lib/form';
  import { useMessage } from '/@/hooks/web/useMessage';

  const {t}=useI18n();

  const {notification,createConfirm} = useMessage();

  const [registerTable,table] = useTable( 
    {
      useSearchForm:true,
      
      formConfig:{
        labelWidth:120,
        baseColProps:{
        xl:8,
        md:12,
        xs:24,
        },
        schemas:[//查询时的策略是全字符匹配
          {
            field:'name',
            component:'Input',
            label:t('basic.materialType.name'),
            componentProps:{
              defaultValue:'123'
            }
          },
          // {
          //   field:'description',
          //   component:'Input',
          //   label:t('basic.materialType.description'),
          // }
        ],
      },
      bordered:true,
      columns:[
      {
        dataIndex:'name',
        title:t('basic.materialType.name'),  
        width:200,
      },
      {
        dataIndex:'description',
        title:t('basic.materialType.description'),  
        align:'left',
      },
      {
        dataIndex:'action',
        title:t('common.action'),
        slots:{
          customRender:'action',
        }
      }
    ],
    api:async({page,pageSize,...params})=>{
      const res = await getMaterialTypeList({
        skipCount:((page-1))*pageSize,//如果值为(page-1)*pageSize，会报错/pageSize*((page-1))
        maxResultCount:pageSize,
        ...params
      });

      return {
        total:res.totalCount,
        items:res.items,
      }
    }
    });

  const [registerModal,Modal] = useModal();

  const [registerForm,Form] = useForm({
    showActionButtonGroup:false,
    labelWidth:120,
    baseColProps:{
      span:20,
    },
    schemas:[
      {
        field:'id',
        component:'Input',
        label:"ID",
        show:false,
      },
      {
        field:'name',
        component:'Input',
        label:t('basic.materialType.name'),
        required:true,
      },
      {
        field:'description',
        component:'InputTextArea',
        label:t('basic.materialType.description'),
        // rules:[
        //   {
        //     max:500,
        //     message:t('basic.materialType.description'),
        //   }
        // ]
      }
    ],
    // submitFunc:async()=>{
    //   await Form.validateFields();
    //   let {name,description} = Form.getFieldsValue();
    //   let model:MaterialTypeCreateModel = {name,description};
    //   await createMaterialType(model);
    //   Form.resetFields();
    //   Modal.closeModal();
    //   await table.reload();
    // },
  });

  const onCreateClick=()=>{
    console.log('onCreateClick');
    Modal.setModalProps({
      title:t('common.create')+t('basic.materialType.title'),
      visible:true,
      okButtonProps:{
        onClick:async ()=>{
          await Form.validateFields();
          let {name,description} = Form.getFieldsValue();
          let model:MaterialTypeCreateModel = {name,description};
          await createMaterialType(model);
          Form.resetFields();
          Modal.closeModal();
          await table.reload();
          notification.success({message:t('common.createSuccess')});
        },
      }
    });
   };

   const onEditClick=(record:any)=>{
    console.log(record);
    Modal.setModalProps({
      title:t('common.edit')+t('basic.materialType.title'),
      visible:true,
      okButtonProps:{
        onClick:async ()=>{
          // const values = creationForm.getFieldsValue();
          await Form.validateFields();
          let {id,name,description} = Form.getFieldsValue();
          let model:MaterialTypeCreateModel = {name,description};
          await updateMaterialType(id,model);
          Form.resetFields();
          Modal.closeModal();
          await table.reload();
          notification.success({message:t('common.editSuccess')});
        },
      },
    });

    //点击编辑时，带出数据
    nextTick(()=>{
      Form.setFieldsValue(record);
    });
  };


  const onDeleteClick=(id:string)=>{
    console.log(id);
    createConfirm({
      iconType:'warning',
      title:t('common.deleteConfirm'),
      content:t('common.deleteConfirmContent'),
      onOk:async()=>{
        await deleteMaterialType(id);
        await table.reload();
        notification.success({message:t('common.deleteSuccess')});
      },
    });
  };


</script>