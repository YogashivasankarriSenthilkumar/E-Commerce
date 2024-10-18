import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { storeData } from "../../assets/data/dummyData";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const formattedName = product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/products/${formattedName}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 330,
        height: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }} onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="200"
          image={product.img}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.text}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Price: ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const TopSellingList = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleViewAll = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

  const currentProducts = storeData.slice(0, visibleProducts);
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Top Selling
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {currentProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {visibleProducts < storeData.length && (
        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            onClick={handleViewAll}
            className="bg-black text-white px-6 py-2 rounded-full"
            sx={{
              marginTop: "20px",
              borderRadius: "50px",
              border: "2px solid black",
              color: "black",
              backgroundColor: "transparent",
              "&:hover": { color: "white", backgroundColor: "black" },
            }}
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopSellingList;
