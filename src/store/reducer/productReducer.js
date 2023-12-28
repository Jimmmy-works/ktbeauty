import { THUNK_STATUS } from "@/contants/thunkstatus";
import productService from "@/service/productService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ///Category
  categories: [],
  ////Product
  products: [],
  productDetail: null,
  productSearch: [],
  statusGetProductDetail: THUNK_STATUS.fulfilled,
  statusGetProductSelected: null,
  statusGetAllProducts: null,
  totalProducts: null,
  totalPage: null,
  /// filter
};
export const { reducer: productReducer, actions: productActions } = createSlice(
  {
    initialState,
    name: "product",
    reducers: {
      setCategories: (state, action) => {
        state.categories = action.payload;
      },
      setProducts: (state, action) => {
        state.products = action.payload;
      },
      setTotalProducts: (state, action) => {
        state.totalProducts = action.payload;
      },
      setTotalPage: (state, action) => {
        state.totalPage = action.payload;
      },
      setProductDetail: (state, action) => {
        state.productDetail = action.payload;
      },
      setProductSearch: (state, action) => {
        state.productSearch = action.payload;
      },
    },
    extraReducers: (builder) => {
      //statusGetProductDetail
      builder.addCase(getProductDetail.pending, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.pending;
      });
      builder.addCase(getProductDetail.fulfilled, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getProductDetail.rejected, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.rejected;
      });
      //statusGetAllProducts
      builder.addCase(getAllProduct.pending, (state) => {
        state.statusGetAllProducts = THUNK_STATUS.pending;
      });
      builder.addCase(getAllProduct.fulfilled, (state) => {
        state.statusGetAllProducts = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getAllProduct.rejected, (state) => {
        state.statusGetAllProducts = THUNK_STATUS.rejected;
      });
      //statusGetProduct
      builder.addCase(getProductSelected.pending, (state) => {
        state.statusGetProductSelected = THUNK_STATUS.pending;
      });
      builder.addCase(getProductSelected.fulfilled, (state) => {
        state.statusGetProductSelected = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getProductSelected.rejected, (state) => {
        state.statusGetProductSelected = THUNK_STATUS.rejected;
      });
    },
  }
);
export const getAllCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllCategories();
      if (response?.status === 200) {
        thunkAPI.dispatch(productActions.setCategories(response?.data?.data));
      }
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getAllProduct = createAsyncThunk(
  "product/get",
  async (payload, thunkAPI) => {
    try {
      const response = await productService.getAllProduct(payload);
      thunkAPI.dispatch(productActions.setProducts(response?.data?.data));
      thunkAPI.dispatch(productActions.setTotalProducts(response?.data?.total));
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getProductDetail = createAsyncThunk(
  "product-detail/get",
  async (slug, thunkAPI) => {
    try {
      const response = await productService.getProductById(slug);
      thunkAPI.dispatch(productActions.setProductDetail(response?.data?.data));
      thunkAPI.dispatch(productActions.setTotalProducts(response?.data?.total));
      thunkAPI.dispatch(productActions.setTotalPage(response?.data?.totalPage));
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getProductSelected = createAsyncThunk(
  "product/get/param",
  async (query, thunkAPI) => {
    try {
      if (query) {
        const response = await productService.getProductSelected(query);
        thunkAPI.dispatch(productActions.setProducts(response?.data?.data));
        thunkAPI.dispatch(
          productActions.setTotalProducts(response?.data?.total)
        );
        thunkAPI.dispatch(
          productActions.setTotalPage(response?.data?.totalPage)
        );
        return response?.data?.data;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
