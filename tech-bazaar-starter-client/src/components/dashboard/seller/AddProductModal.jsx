"use client";
import React from "react";
import {Button,Input,Label,Modal,Surface,TextField,} from "@heroui/react";
import { uploadImageToImgBB } from "@/lib/imgbb";

const AddProductModal = () => {

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const product = {
    ...Object.fromEntries(formData),
  };

  product.quantity = Number(product.quantity);

  try {
    const imageUrl = await uploadImageToImgBB(product.image);

    const productData = {
      ...product,
      image: imageUrl,
    };

    console.log(productData);

  } 
  catch(error){
    console.log(error);
  }
};

  return (
    <Modal>
      <Button variant="secondary">Open Product Form</Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Add Product</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <TextField
                    className="w-full"
                    name="title"
                    variant="secondary"
                  >
                    <Label>Title</Label>
                    <Input placeholder="Title" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="description"
                    variant="secondary"
                  >
                    <Label>Description</Label>
                    <Input placeholder="Description" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="price"
                    variant="secondary"
                  >
                    <Label>Price</Label>
                    <Input placeholder="Price" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="quantity"
                    variant="secondary"
                  >
                    <Label>Quantity</Label>
                    <Input placeholder="Quantity" />
                  </TextField>

                  <div className="space-y-2">
                    <Label>Image</Label>
                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      required
                    />
                  </div>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>

                    <Button type="submit">
                      Add Product
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default AddProductModal;