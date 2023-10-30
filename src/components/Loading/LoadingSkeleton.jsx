import { Empty, Skeleton } from "antd";
import React from "react";
import { styled } from "styled-components";

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
  .ant-skeleton {
    margin-top: 10px;
    .ant-skeleton-content {
      min-width: 180px !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .ant-skeleton-title {
        min-width: 180px !important;
      }
    }
    .ant-skeleton-paragraph {
      min-width: 180px !important;
      margin-block-start: 0 !important;
    }
  }
  .ant-skeleton-element {
    width: 100%;
    .ant-skeleton-image {
      min-height: 275px;
      width: 100%;
      svg {
        min-height: 80px;
        min-width: 80px;
      }
    }
  }
`;
export default function LoadingSkeleton({
  isArray = 1,
  isData,
  isLoading,
  isStyled,
  isParagraph,
  isSize,
  isClassName,
  itemStyles,
  isImageStyle,
}) {
  return (
    <>
      {!isLoading && isData?.length === 0 && (
        <Empty
          description="Dữ liệu lỗi. Xin vui lòng thử lại"
          style={{ margin: "20px auto", fontSize: 20 }}
        />
      )}

      {isLoading &&
        Array(isArray)
          .fill("")
          .map((_, index) => {
            return (
              <div style={itemStyles} className={isClassName} key={index}>
                <SkeletonWrapper>
                  <Skeleton.Image style={isImageStyle} />
                  <Skeleton
                    title={null}
                    isData={isData}
                    style={isStyled}
                    active
                    size={isSize}
                    paragraph={{
                      rows: isParagraph,
                    }}
                  />
                </SkeletonWrapper>
              </div>
            );
          })}
    </>
  );
}
