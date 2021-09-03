import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup, 
  Label,
  Input
} from "reactstrap";
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const ItemModal = (props) => {
  const [modal, setModal] = useState(false)
  const [name, setName] = useState("")
  const handleToggle = () => setModal(!modal)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name
    }

    props.addItem(newItem);

    handleToggle();
  }
  
  return (
    <div>
      <Button
        color="dark"
        style={{marginBottom: "2rem"}}
        onClick={handleToggle}
      >
        Add Item
      </Button>
      <Modal
        isOpen={modal}
        toggle={handleToggle}
      >
        <ModalHeader toggle={handleToggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

    </div>
  )
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);
